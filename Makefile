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



workflow-profile:
	@echo "Building workflow-profile..."
	node generate-soss-docs.js profiles/workflow/profile-crate/ro-crate-metadata.json profiles/workflow/profile-text.md profiles/workflow/profile-crate/profile-documentation.md
	@echo "workflow-profile built successfully."