from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from typing import List
from models import (
    Project, ProjectCreate, Contact, ContactCreate, 
    Testimonial, TestimonialCreate, ProfileInfo, ProfileUpdate
)

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI(title="Portfolio 2025 API", version="1.0.0")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Project endpoints
@api_router.get("/projects", response_model=List[Project])
async def get_projects():
    projects = await db.projects.find().to_list(1000)
    return [Project(**project) for project in projects]

@api_router.get("/projects/{category}", response_model=List[Project])
async def get_projects_by_category(category: str):
    projects = await db.projects.find({"category": category}).to_list(1000)
    return [Project(**project) for project in projects]

@api_router.get("/projects/featured", response_model=List[Project])
async def get_featured_projects():
    projects = await db.projects.find({"is_featured": True}).to_list(1000)
    return [Project(**project) for project in projects]

@api_router.post("/projects", response_model=Project)
async def create_project(project: ProjectCreate):
    project_dict = project.dict()
    project_obj = Project(**project_dict)
    await db.projects.insert_one(project_obj.dict())
    return project_obj

@api_router.get("/projects/single/{project_id}", response_model=Project)
async def get_project(project_id: str):
    project = await db.projects.find_one({"id": project_id})
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    return Project(**project)

@api_router.delete("/projects/{project_id}")
async def delete_project(project_id: str):
    result = await db.projects.delete_one({"id": project_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Project not found")
    return {"message": "Project deleted successfully"}

# Contact endpoints
@api_router.post("/contacts", response_model=Contact)
async def create_contact(contact: ContactCreate):
    contact_dict = contact.dict()
    contact_obj = Contact(**contact_dict)
    await db.contacts.insert_one(contact_obj.dict())
    return contact_obj

@api_router.get("/contacts", response_model=List[Contact])
async def get_contacts():
    contacts = await db.contacts.find().sort("created_at", -1).to_list(1000)
    return [Contact(**contact) for contact in contacts]

@api_router.patch("/contacts/{contact_id}/read")
async def mark_contact_as_read(contact_id: str):
    result = await db.contacts.update_one(
        {"id": contact_id},
        {"$set": {"is_read": True}}
    )
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Contact not found")
    return {"message": "Contact marked as read"}

# Testimonial endpoints
@api_router.get("/testimonials", response_model=List[Testimonial])
async def get_testimonials():
    testimonials = await db.testimonials.find({"is_active": True}).to_list(1000)
    return [Testimonial(**testimonial) for testimonial in testimonials]

@api_router.post("/testimonials", response_model=Testimonial)
async def create_testimonial(testimonial: TestimonialCreate):
    testimonial_dict = testimonial.dict()
    testimonial_obj = Testimonial(**testimonial_dict)
    await db.testimonials.insert_one(testimonial_obj.dict())
    return testimonial_obj

@api_router.delete("/testimonials/{testimonial_id}")
async def delete_testimonial(testimonial_id: str):
    result = await db.testimonials.delete_one({"id": testimonial_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Testimonial not found")
    return {"message": "Testimonial deleted successfully"}

# Profile endpoints
@api_router.get("/profile", response_model=ProfileInfo)
async def get_profile():
    profile = await db.profile.find_one()
    if not profile:
        # Create default profile if it doesn't exist
        default_profile = ProfileInfo(
            bio="Passionate visual designer specializing in creating modern, professional designs that make an impact. With expertise in CV design, brand identity, and social media templates.",
            total_projects=150,
            happy_clients=50,
            awards=5
        )
        await db.profile.insert_one(default_profile.dict())
        return default_profile
    return ProfileInfo(**profile)

@api_router.patch("/profile", response_model=ProfileInfo)
async def update_profile(profile_update: ProfileUpdate):
    # Get current profile
    current_profile = await db.profile.find_one()
    if not current_profile:
        raise HTTPException(status_code=404, detail="Profile not found")
    
    # Update only provided fields
    update_dict = {k: v for k, v in profile_update.dict().items() if v is not None}
    if update_dict:
        await db.profile.update_one({}, {"$set": update_dict})
    
    # Return updated profile
    updated_profile = await db.profile.find_one()
    return ProfileInfo(**updated_profile)

@api_router.post("/profile/cv-download")
async def increment_cv_download():
    result = await db.profile.update_one(
        {},
        {"$inc": {"cv_download_count": 1}}
    )
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Profile not found")
    return {"message": "CV download count incremented"}

# Health check
@api_router.get("/")
async def root():
    return {"message": "Portfolio 2025 API is running", "status": "healthy"}

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("startup")
async def startup_event():
    logger.info("Portfolio 2025 API starting up...")
    
    # Initialize database with sample data if empty
    await initialize_sample_data()

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()

async def initialize_sample_data():
    """Initialize database with sample data if collections are empty"""
    
    # Check if projects collection is empty
    projects_count = await db.projects.count_documents({})
    if projects_count == 0:
        sample_projects = [
            {
                "title": "Modern Professional CV",
                "description": "Clean, minimalist design perfect for corporate professionals",
                "image": "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=400&h=600&fit=crop",
                "category": "cv",
                "tags": ["Professional", "Modern", "Clean"],
                "is_featured": True
            },
            {
                "title": "Creative Designer CV",
                "description": "Bold, colorful design for creative professionals",
                "image": "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=400&h=600&fit=crop",
                "category": "cv",
                "tags": ["Creative", "Bold", "Colorful"],
                "is_featured": False
            },
            {
                "title": "Executive CV Template",
                "description": "Premium design for senior executives and leadership roles",
                "image": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop",
                "category": "cv",
                "tags": ["Executive", "Premium", "Leadership"],
                "is_featured": True
            },
            {
                "title": "Tech Startup Brand",
                "description": "Complete brand identity for innovative tech company",
                "image": "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=400&fit=crop",
                "category": "branding",
                "tags": ["Tech", "Startup", "Innovation"],
                "is_featured": True
            },
            {
                "title": "Coffee Shop Branding",
                "description": "Warm, inviting brand identity for local coffee shop",
                "image": "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&h=400&fit=crop",
                "category": "branding",
                "tags": ["Coffee", "Local", "Warm"],
                "is_featured": False
            },
            {
                "title": "Fashion Brand Identity",
                "description": "Elegant and sophisticated branding for fashion label",
                "image": "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=400&fit=crop",
                "category": "branding",
                "tags": ["Fashion", "Elegant", "Sophisticated"],
                "is_featured": False
            },
            {
                "title": "Instagram Post Templates",
                "description": "Cohesive social media templates for Instagram",
                "image": "https://images.unsplash.com/photo-1611262588024-d12430b98920?w=400&h=400&fit=crop",
                "category": "social",
                "tags": ["Instagram", "Social", "Templates"],
                "is_featured": True
            },
            {
                "title": "LinkedIn Post Designs",
                "description": "Professional post templates for LinkedIn engagement",
                "image": "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=400&fit=crop",
                "category": "social",
                "tags": ["LinkedIn", "Professional", "Engagement"],
                "is_featured": False
            },
            {
                "title": "Social Media Kit",
                "description": "Complete social media design kit for businesses",
                "image": "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=400&h=400&fit=crop",
                "category": "social",
                "tags": ["Social Media", "Business", "Kit"],
                "is_featured": False
            }
        ]
        
        # Insert sample projects
        for project_data in sample_projects:
            project = Project(**project_data)
            await db.projects.insert_one(project.dict())
        
        logger.info("Sample projects inserted into database")
    
    # Check if testimonials collection is empty
    testimonials_count = await db.testimonials.count_documents({})
    if testimonials_count == 0:
        sample_testimonials = [
            {
                "name": "Sarah Johnson",
                "role": "Marketing Director",
                "company": "TechCorp",
                "message": "Ashin's design work is exceptional. The CV template helped me land my dream job!",
                "avatar": "https://images.unsplash.com/photo-1494790108755-2616b9de11e2?w=100&h=100&fit=crop&crop=face"
            },
            {
                "name": "Michael Chen",
                "role": "Startup Founder",
                "company": "InnovateLab",
                "message": "The branding identity Ashin created perfectly captures our company's vision and values.",
                "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
            },
            {
                "name": "Emma Rodriguez",
                "role": "Social Media Manager",
                "company": "Creative Agency",
                "message": "The social media templates have transformed our online presence. Highly recommended!",
                "avatar": "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face"
            }
        ]
        
        # Insert sample testimonials
        for testimonial_data in sample_testimonials:
            testimonial = Testimonial(**testimonial_data)
            await db.testimonials.insert_one(testimonial.dict())
        
        logger.info("Sample testimonials inserted into database")