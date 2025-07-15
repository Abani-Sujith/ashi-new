from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime
import uuid

class Project(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    description: str
    image: str
    category: str  # 'cv', 'branding', 'social'
    tags: List[str]
    created_at: datetime = Field(default_factory=datetime.utcnow)
    is_featured: bool = False

class ProjectCreate(BaseModel):
    title: str
    description: str
    image: str
    category: str
    tags: List[str]
    is_featured: bool = False

class Contact(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    message: str
    created_at: datetime = Field(default_factory=datetime.utcnow)
    is_read: bool = False

class ContactCreate(BaseModel):
    name: str
    email: str
    message: str

class Testimonial(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    role: str
    company: str
    message: str
    avatar: str
    created_at: datetime = Field(default_factory=datetime.utcnow)
    is_active: bool = True

class TestimonialCreate(BaseModel):
    name: str
    role: str
    company: str
    message: str
    avatar: str
    is_active: bool = True

class ProfileInfo(BaseModel):
    name: str = "Ashin Krishna"
    bio: str
    email: str = "ashin.krishna@example.com"
    linkedin: str = "https://linkedin.com/in/ashin-krishna"
    behance: str = "https://behance.net/ashin-krishna"
    cv_download_count: int = 0
    total_projects: int = 0
    happy_clients: int = 0
    awards: int = 0
    updated_at: datetime = Field(default_factory=datetime.utcnow)

class ProfileUpdate(BaseModel):
    bio: Optional[str] = None
    email: Optional[str] = None
    linkedin: Optional[str] = None
    behance: Optional[str] = None
    cv_download_count: Optional[int] = None
    total_projects: Optional[int] = None
    happy_clients: Optional[int] = None
    awards: Optional[int] = None