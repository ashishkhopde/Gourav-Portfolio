import React, { useEffect, useState } from "react";
import api from "../config/api";

export default function Infos() {
  const [services, setServices] = useState([]);
  const [categories, setCategories] = useState([]);
  const [newService, setNewService] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [showServiceModal, setShowServiceModal] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [editService, setEditService] = useState(null);
  const [editCategory, setEditCategory] = useState(null);

  // Fetch data
  useEffect(() => {
    fetchServices();
    fetchCategories();
  }, []);

  const fetchServices = async () => {
    try {
      const res = await api.get("/services");
      setServices(res.data);
    } catch (error) {
      console.error("Error fetching services", error);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await api.get("/category");
      setCategories(res.data.categories || []);
    } catch (error) {
      console.error("Error fetching categories", error);
    }
  };

  const handleAddService = async () => {
    if (!newService.trim()) return alert("Enter a service name");
    try {
      await api.post("/services", { serviceName: newService });
      setNewService("");
      setShowServiceModal(false);
      fetchServices();
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddCategory = async () => {
    if (!newCategory.trim()) return alert("Enter a category name");
    try {
      await api.post("/category", { category: newCategory });
      setNewCategory("");
      setShowCategoryModal(false);
      fetchCategories();
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditService = async () => {
    if (!editService) return;
    const nextName = editService.serviceName?.trim();
    if (!nextName) return alert("Service name cannot be empty");
    try {
      await api.put(`/services/${editService._id}`, { serviceName: nextName });
      setEditService(null);
      fetchServices();
    } catch (error) {
      console.error("Error updating service", error);
      alert("Failed to update service");
    }
  };

  const handleDeleteService = async (serviceId) => {
    if (!confirm("Delete this service?")) return;
    try {
      await api.delete(`/services/${serviceId}`);
      setServices((prev) => prev.filter((s) => s._id !== serviceId));
    } catch (error) {
      console.error("Error deleting service", error);
      alert("Failed to delete service");
    }
  };

  const handleEditCategory = async () => {
    if (!editCategory) return;
    const nextName = editCategory.category?.trim();
    if (!nextName) return alert("Category name cannot be empty");
    try {
      await api.put(`/category/${editCategory._id}`, { category: nextName });
      setEditCategory(null);
      fetchCategories();
    } catch (error) {
      console.error("Error updating category", error);
      alert("Failed to update category");
    }
  };

  const handleDeleteCategory = async (categoryId) => {
    if (!confirm("Delete this category?")) return;
    try {
      await api.delete(`/category/${categoryId}`);
      setCategories((prev) => prev.filter((c) => c._id !== categoryId));
    } catch (error) {
      console.error("Error deleting category", error);
      alert("Failed to delete category");
    }
  };

  return (
    <section className="min-h-screen px-6 pt-24 text-white bg-black md:px-20">
      <div className="flex flex-col gap-6 mb-10 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-4xl font-bold text-red-500">Infos</h1>
          <p className="mt-2 text-gray-400">Manage services and categories</p>
        </div>
      </div>

      {/* Actions */}
      <div className="grid grid-cols-1 gap-6 mb-10 md:grid-cols-2">
        <div className="p-5 border rounded-2xl bg-[#111] border-red-500/20">
          <h2 className="mb-4 text-lg font-semibold text-red-400">Add Service</h2>
          <button
            onClick={() => setShowServiceModal(true)}
            className="px-4 py-2 text-sm font-semibold text-white transition bg-red-600 rounded-lg hover:bg-red-700"
          >
            Add Service
          </button>
        </div>

        <div className="p-5 border rounded-2xl bg-[#111] border-red-500/20">
          <h2 className="mb-4 text-lg font-semibold text-red-400">Add Category</h2>
          <button
            onClick={() => setShowCategoryModal(true)}
            className="px-4 py-2 text-sm font-semibold text-white transition bg-red-600 rounded-lg hover:bg-red-700"
          >
            Add Category
          </button>
        </div>
      </div>

      {/* Tables */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {/* Services Table */}
        <div className="overflow-hidden border rounded-2xl bg-[#111] border-red-500/20">
          <div className="px-5 py-4 border-b border-red-500/20">
            <h2 className="text-lg font-semibold text-red-400">All Services</h2>
          </div>
          <div className="p-4">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="text-left text-gray-300">
                  <th className="p-2 border-b border-red-500/20">#</th>
                  <th className="p-2 border-b border-red-500/20">Service Name</th>
                  <th className="p-2 text-right border-b border-red-500/20">Actions</th>
                </tr>
              </thead>
              <tbody>
                {services.length > 0 ? (
                  services.map((s, index) => (
                    <tr key={s._id} className="border-b border-red-500/10 last:border-b-0">
                      <td className="p-2 text-center text-gray-300">{index + 1}</td>
                      <td className="p-2 text-gray-200">{s.serviceName}</td>
                      <td className="p-2">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => setEditService({ ...s })}
                            className="px-3 py-1 text-xs font-semibold text-white bg-red-600 rounded-md hover:bg-red-700"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteService(s._id)}
                            className="px-3 py-1 text-xs font-semibold text-white bg-red-600/70 rounded-md hover:bg-red-700"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="p-4 text-center text-gray-500">
                      No Services Found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Categories Table */}
        <div className="overflow-hidden border rounded-2xl bg-[#111] border-red-500/20">
          <div className="px-5 py-4 border-b border-red-500/20">
            <h2 className="text-lg font-semibold text-red-400">All Categories</h2>
          </div>
          <div className="p-4">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="text-left text-gray-300">
                  <th className="p-2 border-b border-red-500/20">#</th>
                  <th className="p-2 border-b border-red-500/20">Category Name</th>
                  <th className="p-2 text-right border-b border-red-500/20">Actions</th>
                </tr>
              </thead>
              <tbody>
                {categories.length > 0 ? (
                  categories.map((c, index) => (
                    <tr key={c._id} className="border-b border-red-500/10 last:border-b-0">
                      <td className="p-2 text-center text-gray-300">{index + 1}</td>
                      <td className="p-2 text-gray-200">{c.category}</td>
                      <td className="p-2">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => setEditCategory({ ...c })}
                            className="px-3 py-1 text-xs font-semibold text-white bg-red-600 rounded-md hover:bg-red-700"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteCategory(c._id)}
                            className="px-3 py-1 text-xs font-semibold text-white bg-red-600/70 rounded-md hover:bg-red-700"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="p-4 text-center text-gray-500">
                      No Categories Found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add Service Modal */}
      {showServiceModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90">
          <div className="w-full max-w-md p-6 border rounded-2xl bg-[#111] border-red-500/30">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-red-400">Add Service</h3>
              <button
                onClick={() => setShowServiceModal(false)}
                className="text-gray-400 hover:text-red-500"
              >
                ✕
              </button>
            </div>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="New Service"
                className="w-full px-3 py-2 text-sm text-white bg-black border rounded-lg border-red-500/40 focus:outline-none focus:ring-2 focus:ring-red-500"
                value={newService}
                onChange={(e) => setNewService(e.target.value)}
              />
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setShowServiceModal(false)}
                  className="px-4 py-2 text-sm font-semibold text-white bg-gray-700 rounded-lg hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddService}
                  className="px-4 py-2 text-sm font-semibold text-white transition bg-red-600 rounded-lg hover:bg-red-700"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Category Modal */}
      {showCategoryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90">
          <div className="w-full max-w-md p-6 border rounded-2xl bg-[#111] border-red-500/30">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-red-400">Add Category</h3>
              <button
                onClick={() => setShowCategoryModal(false)}
                className="text-gray-400 hover:text-red-500"
              >
                ✕
              </button>
            </div>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="New Category"
                className="w-full px-3 py-2 text-sm text-white bg-black border rounded-lg border-red-500/40 focus:outline-none focus:ring-2 focus:ring-red-500"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
              />
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setShowCategoryModal(false)}
                  className="px-4 py-2 text-sm font-semibold text-white bg-gray-700 rounded-lg hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddCategory}
                  className="px-4 py-2 text-sm font-semibold text-white transition bg-red-600 rounded-lg hover:bg-red-700"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Service Modal */}
      {editService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90">
          <div className="w-full max-w-md p-6 border rounded-2xl bg-[#111] border-red-500/30">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-red-400">Edit Service</h3>
              <button
                onClick={() => setEditService(null)}
                className="text-gray-400 hover:text-red-500"
              >
                ✕
              </button>
            </div>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Service Name"
                className="w-full px-3 py-2 text-sm text-white bg-black border rounded-lg border-red-500/40 focus:outline-none focus:ring-2 focus:ring-red-500"
                value={editService.serviceName || ""}
                onChange={(e) =>
                  setEditService((prev) => ({ ...prev, serviceName: e.target.value }))
                }
              />
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setEditService(null)}
                  className="px-4 py-2 text-sm font-semibold text-white bg-gray-700 rounded-lg hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  onClick={handleEditService}
                  className="px-4 py-2 text-sm font-semibold text-white transition bg-red-600 rounded-lg hover:bg-red-700"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Category Modal */}
      {editCategory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90">
          <div className="w-full max-w-md p-6 border rounded-2xl bg-[#111] border-red-500/30">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-red-400">Edit Category</h3>
              <button
                onClick={() => setEditCategory(null)}
                className="text-gray-400 hover:text-red-500"
              >
                ✕
              </button>
            </div>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Category Name"
                className="w-full px-3 py-2 text-sm text-white bg-black border rounded-lg border-red-500/40 focus:outline-none focus:ring-2 focus:ring-red-500"
                value={editCategory.category || ""}
                onChange={(e) =>
                  setEditCategory((prev) => ({ ...prev, category: e.target.value }))
                }
              />
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setEditCategory(null)}
                  className="px-4 py-2 text-sm font-semibold text-white bg-gray-700 rounded-lg hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  onClick={handleEditCategory}
                  className="px-4 py-2 text-sm font-semibold text-white transition bg-red-600 rounded-lg hover:bg-red-700"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
