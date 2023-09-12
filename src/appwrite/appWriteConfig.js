import { Account, Client, Databases, ID, Storage } from "appwrite";
import { PUBLIC_APPURL, PUBLIC_COLLECTION_ID_COMPANIES, PUBLIC_COLLECTION_ID_PRODUCTDB, PUBLIC_DBKEY, PUBLIC_PRODUCT_IMAGE_BUCKET, PUBLIC_PROJECTID } from "../contastans/constant";

class AppwriteConfig {
  databaseId = PUBLIC_DBKEY
  imageBucketId = PUBLIC_PRODUCT_IMAGE_BUCKET
  productCollectionId = PUBLIC_COLLECTION_ID_PRODUCTDB
  projectId = PUBLIC_PROJECTID

  client = new Client();
  account = new Account(this.client);
  databases = new Databases(this.client);
  regDb = new Databases(this.client);
  storage = new Storage(this.client);


  constructor() {
    this.client
      .setEndpoint(PUBLIC_APPURL)
      .setProject(PUBLIC_PROJECTID);
  }

  provider() {
    return this.client
  }

  getUniqueId(){
    return Date.now().toString();
  }
  createProduct(
    product_name,
    product_desc,
    product_mrp,
    image_input,
    product_category
  ) {
    try {
      this.storage
        .createFile(this.imageBucketId, ID.unique(), image_input)
        .then((res) => {
          console.log('**response block CreateFile ', JSON.stringify(res));
          let id = String.valueOf(ID.unique());
          console.log('product unique is '+id);
          this.databases
            .createDocument(this.databaseId, this.productCollectionId,ID.unique() , {
              product_name: product_name,
              product_desc: product_desc,
              product_img_url: `https://cloud.appwrite.io/v1/storage/buckets/${this.imageBucketId}/files/${res.$id}/view?project=${this.projectId}&mode=admin`,
              product_mrp: product_mrp,
              product_category: product_category,
              img_id: res.$id
            })
            .then((res) => {
              console.log('**response block CreateDocument ', JSON.stringify(res));
            }).catch(error => {
              console.log('**Error Block CreateDocument:', error);
            });;
        }).catch(error => {
          console.log('**Error Block CreateFile:', error);
        });
    } catch (error) {
      console.log("error block 1");
      throw error;
    }
    return Promise.resolve("sucess");
  }

  deleteProduct(product_id, img_id) {
    console.log({ img_id });

    if (img_id !== null && img_id !== undefined && img_id !== '') {
      // deleting the image 
      this.storage.deleteFile(PUBLIC_PRODUCT_IMAGE_BUCKET, img_id)
        .then(res => {
          console.log('res in deleteProduct ', res);
        })
        .catch(err => {
          console.log('err in delteProduct ', err);
        })
    }

    console.log('inside delete Product');
    this.databases.deleteDocument(PUBLIC_DBKEY, PUBLIC_COLLECTION_ID_PRODUCTDB, product_id)
      .then(res => {
        console.log(res);
      }).catch(err => {
        console.log(err);
      })
    return Promise.resolve("sucess");
  }

  getCompanies() {
    let data = {
      is_error: false,
      document: null,
      error: null
    };
    const databases = new Databases(this.client);
    databases.listDocuments(PUBLIC_DBKEY, PUBLIC_COLLECTION_ID_COMPANIES)
      .then((response) => {
        console.log('success from getCompanies');
        console.log(response); // Success
        data.document = response.documents
        return data;
      }).catch(err => {
        console.log('error from getCompanies');
        data.error = err;
        return data;

      });
  }
}

export { AppwriteConfig };