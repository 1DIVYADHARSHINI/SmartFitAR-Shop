import { useState } from "react";
import { Eye, Sparkles } from "lucide-react";
import galleryImages from "@/data/gallery.json";

const GallerySection = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <section
      id="gallery"
      className="py-20 bg-gradient-to-br from-gray-900 via-blue-950 to-gray-900"
    >
      <div className="max-w-6xl mx-auto px-4">
        {/* Title Section with Dark Color Combo */}
        <div className="text-center mb-12">
          {/* Badge with dark gradient */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-700 via-blue-600 to-cyan-600 text-white text-sm font-semibold mb-6 shadow-lg shadow-blue-900/30">
            <Sparkles className="w-4 h-4" />
            CONTEXTFIT VISUALS
          </div>

          {/* Main Heading with Gradient Text */}
          <h2 className="text-5xl font-bold text-white mb-4">
            Visual{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-300">
              Inspiration
            </span>{" "}
            Gallery
          </h2>

          {/* Subtitle with light text */}
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            See how products look in real spaces with our AR visualization
            technology
          </p>
        </div>

        {/* Gallery Grid - Dark container */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 h-[600px] bg-gray-900/70 backdrop-blur-sm rounded-2xl p-4 shadow-2xl border border-blue-800/30">
          {/* Large Image (Left) */}
          <div
            className="md:col-span-6 rounded-xl overflow-hidden cursor-pointer group relative border-2 border-blue-800/40 shadow-lg hover:shadow-2xl hover:shadow-cyan-900/30 transition-all duration-300"
            onClick={() => setSelectedImage(1)}
          >
            <div className="absolute top-4 left-4 z-10 px-3 py-1 rounded-full bg-gradient-to-r from-blue-800 to-cyan-700 text-white text-xs font-bold shadow-lg shadow-blue-900/50">
              AR Preview
            </div>
            <img
              src={galleryImages[0].url}
              alt="AR visualization in living room"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-blue-950/60 via-blue-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>

          {/* Right Column */}
          <div className="md:col-span-6 grid grid-cols-2 gap-4">
            {/* Top Right - Square */}
            <div
              className="col-span-1 rounded-xl overflow-hidden cursor-pointer group relative border-2 border-blue-800/40 shadow-lg hover:shadow-2xl hover:shadow-blue-900/30 transition-all duration-300"
              onClick={() => setSelectedImage(2)}
            >
              <div className="absolute top-4 left-4 z-10 px-3 py-1 rounded-full bg-gradient-to-r from-blue-900 to-blue-700 text-white text-xs font-bold shadow-lg shadow-blue-900/50">
                3D View
              </div>
              <img
                src={galleryImages[1].url}
                alt="Product preview in home office"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-950/60 via-blue-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            {/* Top Right - Square */}
            <div
              className="col-span-1 rounded-xl overflow-hidden cursor-pointer group relative border-2 border-blue-800/40 shadow-lg hover:shadow-2xl hover:shadow-cyan-900/30 transition-all duration-300"
              onClick={() => setSelectedImage(3)}
            >
              <div className="absolute top-4 left-4 z-10 px-3 py-1 rounded-full bg-gradient-to-r from-cyan-800 to-blue-700 text-white text-xs font-bold shadow-lg shadow-cyan-900/50">
                Room Fit
              </div>
              <img
                src={galleryImages[2].url}
                alt="Furniture in bedroom setting"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-950/60 via-blue-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            {/* Bottom Right - Wide */}
            <div
              className="col-span-2 h-[200px] rounded-xl overflow-hidden cursor-pointer group relative border-2 border-blue-800/40 shadow-lg hover:shadow-2xl hover:shadow-blue-900/30 transition-all duration-300"
              onClick={() => setSelectedImage(4)}
            >
              <div className="absolute top-4 left-4 z-10 px-3 py-1 rounded-full bg-gradient-to-r from-blue-800 to-cyan-700 text-white text-xs font-bold shadow-lg shadow-blue-900/50">
                Smart Preview
              </div>
              <img
                src={galleryImages[3].url}
                alt="Smart appliances in kitchen"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-950/60 via-blue-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            {/* Bottom Right - Small */}
            <div
              className="col-span-1 h-[180px] rounded-xl overflow-hidden cursor-pointer group relative border-2 border-blue-800/40 shadow-lg hover:shadow-2xl hover:shadow-cyan-900/30 transition-all duration-300"
              onClick={() => setSelectedImage(5)}
            >
              <div className="absolute top-4 left-4 z-10 px-3 py-1 rounded-full bg-gradient-to-r from-blue-900 to-cyan-800 text-white text-xs font-bold shadow-lg shadow-cyan-900/50">
                AR Ready
              </div>
              <img
                src={galleryImages[4].url}
                alt="Outdoor furniture visualization"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-950/60 via-blue-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            {/* Bottom Right - Small */}
            <div
              className="col-span-1 h-[180px] rounded-xl overflow-hidden cursor-pointer group relative border-2 border-blue-800/40 shadow-lg hover:shadow-2xl hover:shadow-blue-900/30 transition-all duration-300"
              onClick={() => setSelectedImage(6)}
            >
              <div className="absolute top-4 left-4 z-10 px-3 py-1 rounded-full bg-gradient-to-r from-blue-800 to-blue-600 text-white text-xs font-bold shadow-lg shadow-blue-900/50">
                Context Fit
              </div>
              <img
                src={galleryImages[5].url}
                alt="Dining room context preview"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-950/60 via-blue-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          </div>
        </div>

        {/* Small note below gallery */}
        <div className="text-center mt-8">
          <p className="text-gray-300 text-sm inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-900/80 backdrop-blur-sm border border-blue-800/40 shadow-lg">
            <Eye className="w-4 h-4 text-cyan-400" />
            Click any image to view fullscreen AR preview
          </p>
        </div>
      </div>

      {/* Fullscreen View - Dark theme */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-gray-950/98 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-5xl w-full bg-gradient-to-br from-gray-900 via-blue-950/50 to-gray-900 rounded-2xl p-6 border border-blue-800/50 shadow-2xl shadow-blue-900/30">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage(null);
              }}
              className="absolute -top-12 right-0 text-gray-300 hover:text-white text-2xl transition-colors bg-gray-900/50 p-2 rounded-full backdrop-blur-sm"
            >
              ✕
            </button>
            <div className="text-center mb-6">
              <span className="px-4 py-2 rounded-full bg-gradient-to-r from-blue-800 via-cyan-700 to-blue-700 text-white text-sm font-bold shadow-lg shadow-blue-900/50">
                AR VISUALIZATION MODE
              </span>
            </div>
            <img
              src={
                galleryImages.find((img) => img.id === selectedImage)?.url || ""
              }
              alt="Fullscreen AR view"
              className="w-full h-auto max-h-[70vh] object-contain rounded-xl shadow-2xl border border-blue-800/30"
            />
            <div className="mt-6 text-center">
              <p className="text-gray-400 text-sm">
                Use AR mode on your device for full interactive experience
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default GallerySection;
