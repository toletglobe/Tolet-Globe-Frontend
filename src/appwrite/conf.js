/* eslint-disable no-useless-catch */
import config from '../config/config'
import { Client, ID, Databases, Storage, Query } from 'appwrite'

export class Service {
  client = new Client()
  databases
  bucket

  constructor() {
    this.client
      .setEndpoint(config.appwriteUrl)
      .setProject(config.appwriteProjectId)
    this.databases = new Databases(this.client)
    this.bucket = new Storage(this.client)
  }

  async createPost({ title, content, featuredImage, status, userId, slug }) {
    try {
      return await this.databases.createDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
          userId,
        },
      )
    } catch (error) {
      throw error
    }
  }

  async updatePost(slug, {title, content, featuredImage, status}){
    try {
      return await this.databases.updateDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
        },
      )
    } catch (error) {
      throw error
    }
  }

  async deletePost(slug){
    try {
       await this.databases.deleteDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug,
      )
      return true
    } catch (error) {
      throw error;
    }
  }

  async getPosts(queries=[Query.equal("status","active")]){
   try{
    return await this.databases.listDocuments(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        queries,

      )
   }catch(error){
    throw error;
   } 
  }

  async getPost(slug){
    try{
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug
    }catch(error){
        throw error;
    }
  }

  async uploadFile(file){
    try{
        return await this.bucket.createFile(
            config.appwriteBucketId, 
            ID.unique(), 
            file
        )
    }
    catch(error){
        throw error;
    }
  }

  async deleteFile(fileId){
    try{
        return await this.bucket.deleteFile(
            config.appwriteBucketId,
            fileId
        )
        // return true
    }
    catch(error){
        throw error;
    }
  }

  getFilePreview(fileId){
    return this.bucket.getFilePreview(
        config.appwriteBucketId,
        fileId,
        { width: 300, height: 300 },
    )
  }
}

const appwriteService = new Service()

export default appwriteService
