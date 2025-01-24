output "storage_bucket" {
  value = google_storage_bucket.images.name
}

output "service_account_email" {
  value = google_service_account.admin_sa.email
}

output "firestore_database" {
  value = google_firestore_database.default.name
} 