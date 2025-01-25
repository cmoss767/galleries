variable "project_id" {
  description = "Google Cloud project ID"
  type        = string
}

variable "region" {
  description = "Default region for resources"
  type        = string
  default     = "us-central1"
}

variable "admin_email" {
  description = "Email for the admin user"
  type        = string
}

variable "admin_uid" {
  description = "Firebase Auth UID for admin user"
  type        = string
  sensitive   = true
} 