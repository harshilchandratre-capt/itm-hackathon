import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { userContext } from "@/context/userContext";
import { availabilityStatus, quantityUnits } from "@/lib/utils";
import { productServices } from "@/services/productServices";
import { storageServices } from "@/services/storageServices";
import { useContext, useEffect, useState } from "react";

const AddProduct = () => {
  const [files, setFiles] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({});
  const [permanentUrls, setPermanentUrls] = useState([]);
  const [negotiable, setNegotiable] = useState(false);
  const [title, setTitle] = useState("TAAZE TAMATAR");
  const [sellingPrice, setsellingPrice] = useState("4000"); // FOR COMPLETE quantity
  const [quantity, setQuantity] = useState("20");
  const [quantityUnit, setQuantityUnit] = useState(quantityUnits.KILOGRAM);
  const [status, setStatus] = useState(availabilityStatus.AVAILABLE);
  const [description, setDescription] = useState(
    "taaze taaze tamatar leloooooooooooo"
  );
  const { user } = useContext(userContext);

  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    if (selectedFiles.length === 0) return;
    setFiles(selectedFiles);
    const imagePreviews = selectedFiles
      .filter((file) => file.type.startsWith("image/"))
      .map((file) => URL.createObjectURL(file));
    setPreviewUrls(imagePreviews);
    const initialProgress = {};
    selectedFiles.forEach((file) => {
      initialProgress[file.name] = 0;
    });
    setUploadProgress(initialProgress);
  };

  const handleAddProduct = async () => {
    if (files.length === 0) {
      alert("Please select at least one image.");
      return;
    }

    try {
      setUploading(true);
      const uploaded = [];

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        try {
          const progressInterval = setInterval(() => {
            setUploadProgress((prev) => ({
              ...prev,
              [file.name]: Math.min((prev[file.name] || 0) + 10, 90),
            }));
          }, 200);

          const { response, previewUrl } = await storageServices.uploadFile(
            file
          );
          uploaded.push(previewUrl);

          clearInterval(progressInterval);
          setUploadProgress((prev) => ({
            ...prev,
            [file.name]: 100,
          }));
        } catch (error) {
          console.error("Upload failed for:", file.name, error);
          setUploadProgress((prev) => ({
            ...prev,
            [file.name]: -1,
          }));
          throw new Error(`Failed to upload ${file.name}`);
        }
      }

      const data = {
        userId: user.$id,
        title,
        sellingPrice: parseInt(sellingPrice),
        quantity: parseInt(quantity),
        description,
        media: uploaded,
        availabilityStatus: status,
        negotiable,
      };

      console.log("Product data:", data);

      await productServices.addProduct({ product: data });

      setFiles([]);
      previewUrls.forEach((url) => URL.revokeObjectURL(url));
      setPreviewUrls([]);
      setUploadProgress({});
      setPermanentUrls([]);
      setTitle("");
      setsellingPrice("");
      setQuantity("");
      setDescription("");
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Failed to add product. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const getProgressStatus = (progress) => {
    if (progress === -1) return "Failed";
    if (progress === 100) return "Completed";
    if (progress > 0) return "Uploading";
    return "Pending";
  };

  useEffect(() => {
    return () => {
      previewUrls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [previewUrls]);

  console.log(quantityUnit);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-6">Add Product</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column - Product Details */}
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Product Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter product title"
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="price">
              Selling Price (₹) for complete quantity
            </Label>
            <Input
              id="price"
              type="number"
              value={sellingPrice}
              onChange={(e) => setsellingPrice(e.target.value)}
              placeholder="Enter selling price"
              min="0"
              className="w-full"
            />
          </div>

          {/* switch for negotiable */}
          <Switch
            id="negotiable"
            checked={negotiable}
            onCheckedChange={(e) => {
              setNegotiable(e);
              console.log(negotiable);
            }}
          />
          <Label htmlFor="negotiable">Price Negotiable</Label>

          <div className="space-y-2">
            <Label htmlFor="quantity">Quantity Available</Label>
            <Input
              id="quantity"
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              placeholder="Enter available quantity"
              min="0"
              className="w-full"
            />
          </div>

          {/* radio group for status*/}
          <RadioGroup
            defaultValue={availabilityStatus.AVAILABLE}
            onValueChange={(e) => {
              setStatus(e);
            }}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                value={availabilityStatus.AVAILABLE}
                id="available"
              />
              <Label htmlFor="available">Available</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value={availabilityStatus.SOLD} id="sold" />
              <Label htmlFor="sold">Sold</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                value={availabilityStatus.PROCESSING}
                id="processing"
              />
              <Label htmlFor="processing">Processing</Label>
            </div>
          </RadioGroup>

          {/* radio grp for quant unit */}
          <RadioGroup
            defaultValue={quantityUnits.KILOGRAM}
            onValueChange={(e) => {
              setQuantityUnit(e);
            }}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value={quantityUnits.KILOGRAM} id="kg" />
              <Label htmlFor="kg">kg</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value={quantityUnits.LITRES} id="ltr" />
              <Label htmlFor="ltr">ltr</Label>
            </div>
          </RadioGroup>

          <div className="space-y-2">
            <Label htmlFor="description">Product Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter product description"
              className="w-full min-h-[120px]"
            />
          </div>
        </div>

        {/* Right Column - Image Upload */}
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Product Images</Label>
            <label className="block w-full bg-blue-500 text-white px-4 py-2 rounded cursor-pointer text-center hover:bg-blue-600 transition-colors">
              Select Images
              <input
                type="file"
                multiple
                onChange={handleFileChange}
                className="hidden"
                accept="image/*"
              />
            </label>
          </div>

          {files.length > 0 && (
            <div className="space-y-4">
              {files.map((file, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">{file.name}</span>
                    <span
                      className={`
                        ${
                          uploadProgress[file.name] === 100
                            ? "text-green-600"
                            : ""
                        }
                        ${
                          uploadProgress[file.name] === -1 ? "text-red-600" : ""
                        }
                        ${
                          uploadProgress[file.name] > 0 &&
                          uploadProgress[file.name] < 100
                            ? "text-blue-600"
                            : ""
                        }
                      `}
                    >
                      {getProgressStatus(uploadProgress[file.name])}
                    </span>
                  </div>
                  <Progress
                    value={
                      uploadProgress[file.name] === -1
                        ? 0
                        : uploadProgress[file.name]
                    }
                    className={`h-2 ${
                      uploadProgress[file.name] === -1 ? "bg-red-200" : ""
                    }`}
                  />
                </div>
              ))}
            </div>
          )}

          {previewUrls.length > 0 && (
            <div>
              <p className="text-sm text-gray-600 mb-2">Image Previews:</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {previewUrls.map((url, index) => (
                  <img
                    key={index}
                    src={url}
                    alt={`Preview ${index}`}
                    className="w-full h-24 object-cover rounded border"
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <button
        onClick={handleAddProduct}
        disabled={
          uploading ||
          !title ||
          !sellingPrice ||
          !quantity ||
          !description ||
          files.length === 0
        }
        className="mt-8 w-full md:w-auto bg-blue-600 text-white px-8 py-2 rounded hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:hover:bg-blue-600"
      >
        {uploading ? "Adding Product..." : "Add Product"}
      </button>
    </div>
  );
};

export default AddProduct;
