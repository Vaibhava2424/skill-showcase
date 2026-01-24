import { WixDataItem, WixDataQueryResult } from ".";


/**
 * Generic CRUD Service class for static data
 * Provides type-safe CRUD operations with error handling
 */
export class BaseCrudService {
  /**
   * Creates a new item in the collection
   * @param itemData - Data for the new item (single reference fields should be IDs: string)
   * @param multiReferences - Multi-reference fields as Record<fieldName, arrayOfIds>
   * @returns Promise<T> - The created item
   */
  static async create<T extends WixDataItem>(
    collectionId: string,
    itemData: Partial<T> | Record<string, unknown>,
    multiReferences?: Record<string, any>
  ): Promise<T> {
    throw new Error('CRUD operations not supported in static mode');
  }

  /**
   * Retrieves all items from the collection
   * @param collectionId - The collection to query
   * @param includeReferencedItems - Array of reference field names to populate
   * @returns Promise<WixDataQueryResult<T>> - Query result with all items
   */
  static async getAll<T extends WixDataItem>(
    collectionId: string,
    includeReferencedItems?: string[]
  ): Promise<WixDataQueryResult<T>> {
    // Return empty result for static mode
    return {
      items: [],
      totalCount: 0,
      hasNext: false,
      hasPrev: false,
      pageSize: 0,
      currentPage: 0,
      totalPages: 0
    };
  }

  /**
   * Retrieves a single item by ID
   * @param collectionId - The collection to query
   * @param itemId - ID of the item to retrieve
   * @param includeReferencedItems - Array of reference field names to populate
   * @returns Promise<T | null> - The item or null if not found
   */
  static async getById<T extends WixDataItem>(
    collectionId: string,
    itemId: string,
    includeReferencedItems?: string[]
  ): Promise<T | null> {
    return null;
  }

  /**
   * Updates an existing item
   * @param itemData - Updated item data (must include _id, only include fields to update)
   * @returns Promise<T> - The updated item
   */
  static async update<T extends WixDataItem>(collectionId: string, itemData: T): Promise<T> {
    throw new Error('CRUD operations not supported in static mode');
  }

  /**
   * Deletes an item by ID
   * @param itemId - ID of the item to delete
   * @returns Promise<T> - The deleted item
   */
  static async delete<T extends WixDataItem>(collectionId: string, itemId: string): Promise<T> {
    throw new Error('CRUD operations not supported in static mode');
  }

}
