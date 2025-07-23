all: 

ldac-profile:
	@echo "Building ldac-profile..."
	node generate-soss-docs.js profiles/ldac/profile-crate/ro-crate-metadata.json profiles/ldac/profile-text.md profiles/ldac/profile-crate/profile-documentation.md
	@echo "ldac-profile built successfully."
	
ro-crate-profile:
	@echo "Building ro-crate-profile..."
	node generate-soss-docs.js profiles/ro-crate/profile-crate/ro-crate-metadata.json profiles/ro-crate/profile-text.md profiles/ro-crate/profile-crate/profile-documentation.md
	@echo "ro-crate-profile built successfully."

general-purpose-profile:
	@echo "Building general-purpose-profile..."
	node generate-soss-docs.js profiles/general-purpose-collection/profile-crate/ro-crate-metadata.json profiles/general-purpose-collection/profile-text.md profiles/general-purpose-collection/profile-crate/profile-documentation.md
	@echo "general-purpose-profile built successfully."



workflow-profile:
	@echo "Building workflow-profile..."
	node generate-soss-docs.js profiles/workflow/profile-crate/ro-crate-metadata.json profiles/workflow/profile-text.md profiles/workflow/profile-crate/profile-documentation.md
	@echo "workflow-profile built successfully."