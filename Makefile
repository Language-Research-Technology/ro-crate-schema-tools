all: 

ldac-profile:
	@echo "Building ldac-profile..."
	node generate-soss-docs.js profiles/ldac/profile-crate/ro-crate-metadata.json profiles/ldac/profile-text.md profiles/ldac/profile-crate/profile-documentation.md
	@echo "ldac-profile built successfully."
	
ro-crate-profile:
	@echo "Building ro-crate-profile..."
	node generate-soss-docs.js profiles/ro-crate/profile-crate/ro-crate-metadata.json profiles/ro-crate/profile-text.md profiles/ro-crate/profile-crate/profile-documentation.md
	@echo "ro-crate-profile built successfully."

generic-profile:
	@echo "Building generic-profile..."
	node generate-soss-docs.js profiles/generic-collection/profile-crate/ro-crate-metadata.json profiles/generic-collection/profile-text.md profiles/generic-collection/profile-crate/profile-documentation.md
	@echo "generic-profile built successfully."

danala-schema:
	@echo "Building danala-schema..."
	node generate-soss-docs.js schemas/danala-schema/schema-crate/ro-crate-metadata.json schemas/danala-schema/schema-text.md schemas/danala-schema/schema-crate/schema-documentation.md
	@echo "danala-schema built successfully."

workflow-profile:
	@echo "Building workflow-profile..."
	node generate-soss-docs.js profiles/workflow/profile-crate/ro-crate-metadata.json profiles/workflow/profile-text.md profiles/workflow/profile-crate/profile-documentation.md
	@echo "workflow-profile built successfully."

soa-profile:
	@echo "Building soa-profile..."
	node generate-soss-docs.js profiles/soa/profile-crate/ro-crate-metadata.json profiles/soa/profile-text.md profiles/soa/profile-crate/profile-documentation.md
	@echo "soa-profile built successfully."