# Queries to create database
We can use following queries to create database in respective databases for ERDDiagram.jpeg under **documents** folder

## PostgreSQL
--------------------
```
CREATE TABLE "Products" (
  "ProductID" <type>,
  "BrandID" <type>,
  "ProductName" <type>,
  "ProductDescription" <type>,
  "Size" <type>,
  "Color" <type>,
  "AvailableProduct" <type>,
  "Price" <type>,
  "Weight" <type>,
  "Picture" <type>,
  "Note" <type>,
  PRIMARY KEY ("ProductID")
);

CREATE TABLE "Users" (
  "UserID" <type>,
  "RegDate" <type>,
  "FirstName" <type>,
  "LastName" <type>,
  "Email" <type>,
  "Password" <type>,
  "UserRole" <type>,
  PRIMARY KEY ("UserID")
);

CREATE TABLE "Customers" (
  "CustomerID" <type>,
  "UserID" <type>,
  "Address1" <type>,
  "Address2" <type>,
  "City" <type>,
  "State" <type>,
  "PostalCode" <type>,
  "Country" <type>,
  "Phone" <type>,
  "CreditCard" <type>,
  "CreditCardXpMo" <type>,
  "CreditCardXpYr" <type>,
  "BillingAddress" <type>,
  "BillingCity" <type>,
  "BillingRegion" <type>,
  "BillingPostalCode" <type>,
  "BillingCountry" <type>,
  "ShippingAdress" <type>,
  "ShippingCity" <type>,
  "ShippingRegion" <type>,
  "ShippingPostalCode" <type>,
  "MembershipStatus" <type>,
  PRIMARY KEY ("CustomerID"),
  CONSTRAINT "FK_Customers.Address2"
    FOREIGN KEY ("Address2")
      REFERENCES "Users"("UserRole")
);

CREATE TABLE "Payments" (
  "PaymentID" <type>,
  "OrderID" <type>,
  "PaymentType" <type>,
  "PaymentDate" <type>,
  "PaymentStatus" <type>,
  PRIMARY KEY ("PaymentID")
);

CREATE TABLE "Orders" (
  "OrderID" <type>,
  "ProductID" <type>,
  "PaymentID" <type>,
  "CustomerID" <type>,
  "OrderNumber" <type>,
  "OrderDate" <type>,
  "Quantity" <type>,
  "TotalPrice" <type>,
  "BillingAddress" <type>,
  "ShippingAddress" <type>,
  "Color" <type>,
  "Weight" <type>,
  "Price" <type>,
  CONSTRAINT "FK_Orders.ShippingAddress"
    FOREIGN KEY ("ShippingAddress")
      REFERENCES "Customers"("PostalCode")
);

CREATE INDEX "Pk" ON  "Orders" ("OrderID");

CREATE TABLE "Brands" (
  "BrandID" <type>,
  "BrandName" <type>,
  PRIMARY KEY ("BrandID")
);
```
## mySQL
-----------------
```
CREATE TABLE `Products` (
  `ProductID` <type>,
  `BrandID` <type>,
  `ProductName` <type>,
  `ProductDescription` <type>,
  `Size` <type>,
  `Color` <type>,
  `AvailableProduct` <type>,
  `Price` <type>,
  `Weight` <type>,
  `Picture` <type>,
  `Note` <type>,
  PRIMARY KEY (`ProductID`)
);

CREATE TABLE `Users` (
  `UserID` <type>,
  `RegDate` <type>,
  `FirstName` <type>,
  `LastName` <type>,
  `Email` <type>,
  `Password` <type>,
  `UserRole` <type>,
  PRIMARY KEY (`UserID`)
);

CREATE TABLE `Customers` (
  `CustomerID` <type>,
  `UserID` <type>,
  `Address1` <type>,
  `Address2` <type>,
  `City` <type>,
  `State` <type>,
  `PostalCode` <type>,
  `Country` <type>,
  `Phone` <type>,
  `CreditCard` <type>,
  `CreditCardXpMo` <type>,
  `CreditCardXpYr` <type>,
  `BillingAddress` <type>,
  `BillingCity` <type>,
  `BillingRegion` <type>,
  `BillingPostalCode` <type>,
  `BillingCountry` <type>,
  `ShippingAdress` <type>,
  `ShippingCity` <type>,
  `ShippingRegion` <type>,
  `ShippingPostalCode` <type>,
  `MembershipStatus` <type>,
  PRIMARY KEY (`CustomerID`),
  FOREIGN KEY (`Address2`) REFERENCES `Users`(`UserRole`)
);

CREATE TABLE `Payments` (
  `PaymentID` <type>,
  `OrderID` <type>,
  `PaymentType` <type>,
  `PaymentDate` <type>,
  `PaymentStatus` <type>,
  PRIMARY KEY (`PaymentID`)
);

CREATE TABLE `Orders` (
  `OrderID` <type>,
  `ProductID` <type>,
  `PaymentID` <type>,
  `CustomerID` <type>,
  `OrderNumber` <type>,
  `OrderDate` <type>,
  `Quantity` <type>,
  `TotalPrice` <type>,
  `BillingAddress` <type>,
  `ShippingAddress` <type>,
  `Color` <type>,
  `Weight` <type>,
  `Price` <type>,
  FOREIGN KEY (`ShippingAddress`) REFERENCES `Customers`(`PostalCode`),
  KEY `Pk` (`OrderID`)
);

CREATE TABLE `Brands` (
  `BrandID` <type>,
  `BrandName` <type>,
  PRIMARY KEY (`BrandID`)
);
```
## SQL Server
```
CREATE TABLE [Products] (
  [ProductID] <type>,
  [BrandID] <type>,
  [ProductName] <type>,
  [ProductDescription] <type>,
  [Size] <type>,
  [Color] <type>,
  [AvailableProduct] <type>,
  [Price] <type>,
  [Weight] <type>,
  [Picture] <type>,
  [Note] <type>,
  PRIMARY KEY ([ProductID])
);

CREATE TABLE [Users] (
  [UserID] <type>,
  [RegDate] <type>,
  [FirstName] <type>,
  [LastName] <type>,
  [Email] <type>,
  [Password] <type>,
  [UserRole] <type>,
  PRIMARY KEY ([UserID])
);

CREATE TABLE [Customers] (
  [CustomerID] <type>,
  [UserID] <type>,
  [Address1] <type>,
  [Address2] <type>,
  [City] <type>,
  [State] <type>,
  [PostalCode] <type>,
  [Country] <type>,
  [Phone] <type>,
  [CreditCard] <type>,
  [CreditCardXpMo] <type>,
  [CreditCardXpYr] <type>,
  [BillingAddress] <type>,
  [BillingCity] <type>,
  [BillingRegion] <type>,
  [BillingPostalCode] <type>,
  [BillingCountry] <type>,
  [ShippingAdress] <type>,
  [ShippingCity] <type>,
  [ShippingRegion] <type>,
  [ShippingPostalCode] <type>,
  [MembershipStatus] <type>,
  PRIMARY KEY ([CustomerID]),
  CONSTRAINT [FK_Customers.Address2]
    FOREIGN KEY ([Address2])
      REFERENCES [Users]([UserRole])
);

CREATE TABLE [Payments] (
  [PaymentID] <type>,
  [OrderID] <type>,
  [PaymentType] <type>,
  [PaymentDate] <type>,
  [PaymentStatus] <type>,
  PRIMARY KEY ([PaymentID])
);

CREATE TABLE [Orders] (
  [OrderID] <type>,
  [ProductID] <type>,
  [PaymentID] <type>,
  [CustomerID] <type>,
  [OrderNumber] <type>,
  [OrderDate] <type>,
  [Quantity] <type>,
  [TotalPrice] <type>,
  [BillingAddress] <type>,
  [ShippingAddress] <type>,
  [Color] <type>,
  [Weight] <type>,
  [Price] <type>,
  CONSTRAINT [FK_Orders.ShippingAddress]
    FOREIGN KEY ([ShippingAddress])
      REFERENCES [Customers]([PostalCode])
);

CREATE INDEX [Pk] ON  [Orders] ([OrderID]);

CREATE TABLE [Brands] (
  [BrandID] <type>,
  [BrandName] <type>,
  PRIMARY KEY ([BrandID])
);
```