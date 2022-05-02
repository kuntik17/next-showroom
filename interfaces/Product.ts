interface Image {
ErrorMessage: string,
Id: number,
ImageUrl: string,
ProductId: number,
}

interface Product {
  Description: string,
  Fabric1: string,
  Fabric2: string,
  Fabric3: string,
  Fabric4: string,
  Fabric5: string,
  FabricCode: string,
  FabricCompany: string,
  FabricPrice: string,
  SalePrice: string,
  Id: number,
  Quantity: number,
  StyleNo: string,
  Images: [Image],
  Liked: Boolean,
  IsNew: number,  
  Hashtags: "",
  ModelGroupName: "PANTS",
    ModelGroupRef: 5,
SubModelGroups: "3"
}

export default Product;