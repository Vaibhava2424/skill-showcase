/**
 * Auto-generated entity types
 * Contains all CMS collection interfaces in a single file 
 */

/**
 * Collection ID: certificates
 * Interface for Certificates
 */
export interface Certificates {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  title?: string;
  /** @wixFieldType text */
  issuingOrganization?: string;
  /** @wixFieldType date */
  issueDate?: Date | string;
  /** @wixFieldType text */
  credentialId?: string;
  /** @wixFieldType url */
  credentialUrl?: string;
  /** @wixFieldType image */
  certificateImage?: string;
  /** @wixFieldType number */
  id?: number;
  /** @wixFieldType text */
  description?: string;
  /** @wixFieldType url */
  liveUrl?: string;
  /** @wixFieldType text */
  fallbackText?: string;
}


/**
 * Collection ID: projects
 * Interface for Projects
 */
export interface Projects {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  title?: string;
  /** @wixFieldType image */
  thumbnail?: string;
  /** @wixFieldType text */
  description?: string;
  /** @wixFieldType text */
  category?: string;
  /** @wixFieldType url */
  projectUrl?: string;
  /** @wixFieldType text */
  technologies?: string;
  /** @wixFieldType date */
  completionDate?: Date | string;
}


/**
 * Collection ID: skills
 * Interface for Skills
 */
export interface Skills {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  skillName?: string;
  /** @wixFieldType text */
  description?: string;
  /** @wixFieldType text */
  proficiencyLevel?: string;
  /** @wixFieldType text */
  category?: string;
  /** @wixFieldType number */
  yearsOfExperience?: number;
  /** @wixFieldType image */
  skillImage?: string;
}
