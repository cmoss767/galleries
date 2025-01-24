terraform {
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "~> 4.0"
    }
  }
}

provider "google" {
  project = var.project_id
  region  = var.region
}

# Enable required APIs
resource "google_project_service" "services" {
  for_each = toset([
    "cloudfunctions.googleapis.com",
    "storage.googleapis.com",
    "firestore.googleapis.com",
    "cloudbuild.googleapis.com"
  ])
  
  service = each.key
  disable_on_destroy = false
}

# Create Storage bucket for images
resource "google_storage_bucket" "images" {
  name     = "${var.project_id}-images"
  location = var.region
  
  uniform_bucket_level_access = true
  
  cors {
    origin          = ["*"]
    method          = ["GET", "POST", "PUT"]
    response_header = ["Content-Type"]
    max_age_seconds = 3600
  }
}

# Create Firestore database
resource "google_firestore_database" "default" {
  name        = "(default)"
  location_id = var.region
  type        = "FIRESTORE_NATIVE"

  depends_on = [google_project_service.services["firestore.googleapis.com"]]
}

# Create service account
resource "google_service_account" "admin_sa" {
  account_id   = "gallery-admin-sa"
  display_name = "Gallery Admin Service Account"
}

# Grant necessary roles to service account
resource "google_project_iam_member" "sa_roles" {
  for_each = toset([
    "roles/storage.admin",
    "roles/datastore.user",
    "roles/cloudfunctions.developer"
  ])
  
  project = var.project_id
  role    = each.key
  member  = "serviceAccount:${google_service_account.admin_sa.email}"
} 