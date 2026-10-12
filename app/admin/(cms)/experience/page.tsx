"use client";

import React, { useEffect, useState, useTransition } from "react";
import {
  getClientExperienceList,
  createExperience,
  updateExperience,
  deleteExperience,
  toggleExperienceVisibility,
  type Experience,
  type ExperienceInput,
} from "@/lib/queries/experience";
import {
  Briefcase,
  Plus,
  Pencil,
  Trash2,
  Eye,
  EyeOff,
  CheckCircle2,
  AlertCircle,
  Loader2,
  X,
  MapPin,
  Calendar,
} from "lucide-react";

export default function AdminExperiencePage() {
  const [experienceList, setExperienceList] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [isPending, startTransition] = useTransition();

  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Experience | null>(null);

  // Form inputs
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [employmentType, setEmploymentType] = useState("Full-time");
  const [location, setLocation] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [description, setDescription] = useState("");
  const [responsibilitiesText, setResponsibilitiesText] = useState("");
  const [technologiesText, setTechnologiesText] = useState("");
  const [displayOrder, setDisplayOrder] = useState(1);
  const [isVisible, setIsVisible] = useState(true);

  const fetchList = async () => {
    try {
      const data = await getClientExperienceList();
      setExperienceList(data);
    } catch (err: unknown) {
      console.error("Failed to load experience list:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  const openCreateModal = () => {
    setEditingItem(null);
    setCompany("");
    setRole("");
    setEmploymentType("Full-time");
    setLocation("");
    setStartDate("");
    setEndDate("Present");
    setDescription("");
    setResponsibilitiesText("");
    setTechnologiesText("");
    setDisplayOrder(experienceList.length + 1);
    setIsVisible(true);
    setModalOpen(true);
  };

  const openEditModal = (item: Experience) => {
    setEditingItem(item);
    setCompany(item.company);
    setRole(item.role);
    setEmploymentType(item.employment_type || "Full-time");
    setLocation(item.location || "");
    setStartDate(item.start_date);
    setEndDate(item.end_date || "");
    setDescription(item.description || "");
    setResponsibilitiesText((item.responsibilities || []).join("\n"));
    setTechnologiesText((item.technologies || []).join(", "));
    setDisplayOrder(item.display_order);
    setIsVisible(item.is_visible);
    setModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    const responsibilities = responsibilitiesText
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean);

    const technologies = technologiesText
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    const payload: ExperienceInput = {
      company,
      role,
      employment_type: employmentType || null,
      location: location || null,
      start_date: startDate,
      end_date: endDate || null,
      description: description || null,
      responsibilities,
      technologies,
      logo_url: null,
      display_order: Number(displayOrder) || 1,
      is_visible: isVisible,
    };

    startTransition(async () => {
      try {
        if (editingItem) {
          const updated = await updateExperience(editingItem.id, payload);
          setExperienceList((prev) =>
            prev.map((item) => (item.id === updated.id ? updated : item))
          );
          setMessage({ type: "success", text: "Work experience updated successfully." });
        } else {
          const created = await createExperience(payload);
          setExperienceList((prev) => [...prev, created]);
          setMessage({ type: "success", text: "New work experience added successfully." });
        }
        setModalOpen(false);
      } catch (err: unknown) {
        const errorMsg = err instanceof Error ? err.message : "Failed to save experience.";
        setMessage({ type: "error", text: errorMsg });
      }
    });
  };

  const handleDelete = async (id: string, companyName: string) => {
    if (!confirm(`Are you sure you want to delete experience at "${companyName}"?`)) return;

    try {
      await deleteExperience(id);
      setExperienceList((prev) => prev.filter((item) => item.id !== id));
      setMessage({ type: "success", text: "Experience entry deleted." });
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : "Failed to delete experience.";
      setMessage({ type: "error", text: errorMsg });
    }
  };

  const handleToggleVisibility = async (id: string, currentStatus: boolean) => {
    try {
      await toggleExperienceVisibility(id, !currentStatus);
      setExperienceList((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, is_visible: !currentStatus } : item
        )
      );
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : "Failed to update visibility.";
      setMessage({ type: "error", text: errorMsg });
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#ff3f81]">
            <Briefcase className="w-4 h-4" />
            <span>Career Management</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mt-1">
            Work Experience
          </h1>
          <p className="text-xs sm:text-sm text-gray-400 mt-1">
            Manage your employment history, roles, responsibilities, and achievements.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#ff3f81] hover:bg-[#e0326f] text-white text-xs font-semibold shadow-md shadow-[#ff3f81]/30 transition-all active:scale-95 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add Experience</span>
        </button>
      </div>

      {/* Alert Messages */}
      {message && (
        <div
          className={`p-4 rounded-lg flex items-center gap-3 text-xs sm:text-sm ${
            message.type === "success"
              ? "bg-emerald-500/10 border border-emerald-500/30 text-emerald-300"
              : "bg-rose-500/10 border border-rose-500/30 text-rose-300"
          }`}
        >
          {message.type === "success" ? (
            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
          ) : (
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
          )}
          <span>{message.text}</span>
          <button
            onClick={() => setMessage(null)}
            className="ml-auto text-gray-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Experience List Table / Cards */}
      {loading ? (
        <div className="profile-card p-12 text-center text-gray-400 flex flex-col items-center justify-center gap-3 border border-[#e1bee7]/15">
          <Loader2 className="w-6 h-6 animate-spin text-[#ff3f81]" />
          <span className="text-xs">Loading experience records...</span>
        </div>
      ) : experienceList.length === 0 ? (
        <div className="profile-card p-12 text-center text-gray-400 text-xs sm:text-sm border border-[#e1bee7]/15 space-y-3">
          <p>No work experience entries recorded yet.</p>
          <button
            onClick={openCreateModal}
            className="px-4 py-2 rounded-md bg-[#ff3f81] text-white text-xs font-semibold"
          >
            Add Your First Experience
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {experienceList.map((item) => (
            <div
              key={item.id}
              className={`profile-card p-5 sm:p-6 border transition-all ${
                item.is_visible
                  ? "border-[#e1bee7]/15 bg-[#070522]"
                  : "border-white/5 opacity-60 bg-[#070522]/50"
              }`}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1.5 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-bold text-base sm:text-lg text-white">
                      {item.company}
                    </h3>
                    {item.employment_type && (
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#ff3f81]/15 text-[#ff3f81] border border-[#ff3f81]/30">
                        {item.employment_type}
                      </span>
                    )}
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                        item.is_visible
                          ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
                          : "bg-gray-500/15 text-gray-400 border border-gray-500/30"
                      }`}
                    >
                      {item.is_visible ? "Visible" : "Hidden"}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm font-semibold text-[#e1bee7]">
                    {item.role}
                  </p>

                  <div className="flex flex-wrap items-center gap-3 text-xs text-gray-400 pt-1">
                    <span className="flex items-center gap-1 text-[11px]">
                      <Calendar className="w-3 h-3 text-[#ff3f81]" />
                      <span>{item.start_date} - {item.end_date || "Present"}</span>
                    </span>
                    {item.location && (
                      <span className="flex items-center gap-1 text-[11px]">
                        <MapPin className="w-3 h-3 text-[#ff3f81]" />
                        <span>{item.location}</span>
                      </span>
                    )}
                  </div>

                  {item.responsibilities && item.responsibilities.length > 0 && (
                    <p className="text-xs text-gray-400 pt-2 line-clamp-2">
                      {item.responsibilities[0]}
                    </p>
                  )}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 shrink-0 border-t md:border-t-0 pt-3 md:pt-0 border-white/5">
                  <button
                    onClick={() => handleToggleVisibility(item.id, item.is_visible)}
                    title={item.is_visible ? "Hide from portfolio" : "Show on portfolio"}
                    className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-colors"
                  >
                    {item.is_visible ? (
                      <Eye className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <EyeOff className="w-4 h-4 text-gray-400" />
                    )}
                  </button>

                  <button
                    onClick={() => openEditModal(item)}
                    title="Edit experience"
                    className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 hover:text-[#ff3f81] transition-colors"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => handleDelete(item.id, item.company)}
                    title="Delete experience"
                    className="p-2 rounded-lg bg-white/5 hover:bg-rose-500/20 text-gray-300 hover:text-rose-400 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create / Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#070522] border border-[#e1bee7]/20 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6 shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <h2 className="text-xl font-bold text-white">
                  {editingItem ? "Edit Work Experience" : "Add Work Experience"}
                </h2>
                <p className="text-xs text-gray-400 mt-0.5">
                  Enter role details and achievements.
                </p>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="p-2 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-300">
                    Company Name <span className="text-[#ff3f81]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="e.g. PT Mobil Anak Bangsa"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#19153c] border border-[#e1bee7]/20 text-xs sm:text-sm text-white focus:outline-none focus:border-[#ff3f81]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-300">
                    Role / Position <span className="text-[#ff3f81]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    placeholder="e.g. Programmer / Software Engineer"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#19153c] border border-[#e1bee7]/20 text-xs sm:text-sm text-white focus:outline-none focus:border-[#ff3f81]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-300">
                    Employment Type
                  </label>
                  <select
                    value={employmentType}
                    onChange={(e) => setEmploymentType(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#19153c] border border-[#e1bee7]/20 text-xs sm:text-sm text-white focus:outline-none focus:border-[#ff3f81]"
                  >
                    <option value="Full-time">Full-time</option>
                    <option value="Contract">Contract</option>
                    <option value="Internship">Internship</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Freelance">Freelance</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-300">
                    Location
                  </label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. Jakarta, Indonesia"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#19153c] border border-[#e1bee7]/20 text-xs sm:text-sm text-white focus:outline-none focus:border-[#ff3f81]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-300">
                    Start Date <span className="text-[#ff3f81]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    placeholder="e.g. Dec 2025"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#19153c] border border-[#e1bee7]/20 text-xs sm:text-sm text-white focus:outline-none focus:border-[#ff3f81]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-300">
                    End Date
                  </label>
                  <input
                    type="text"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    placeholder="e.g. Present or Nov 2025"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#19153c] border border-[#e1bee7]/20 text-xs sm:text-sm text-white focus:outline-none focus:border-[#ff3f81]"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-300">
                  Short Summary / Overview
                </label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Brief summary of your primary responsibility or scope."
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#19153c] border border-[#e1bee7]/20 text-xs sm:text-sm text-white focus:outline-none focus:border-[#ff3f81]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-300">
                  Key Responsibilities & Achievements (1 per line)
                </label>
                <textarea
                  rows={5}
                  value={responsibilitiesText}
                  onChange={(e) => setResponsibilitiesText(e.target.value)}
                  placeholder="Enter each achievement on a new line."
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#19153c] border border-[#e1bee7]/20 text-xs sm:text-sm text-white focus:outline-none focus:border-[#ff3f81] font-mono"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-300">
                  Technologies / Skills Used (comma-separated)
                </label>
                <input
                  type="text"
                  value={technologiesText}
                  onChange={(e) => setTechnologiesText(e.target.value)}
                  placeholder="PHP, Laravel, PostgreSQL, ETL, Vue.js"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#19153c] border border-[#e1bee7]/20 text-xs sm:text-sm text-white focus:outline-none focus:border-[#ff3f81]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-300">
                    Display Order
                  </label>
                  <input
                    type="number"
                    value={displayOrder}
                    onChange={(e) => setDisplayOrder(parseInt(e.target.value, 10) || 1)}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#19153c] border border-[#e1bee7]/20 text-xs sm:text-sm text-white focus:outline-none focus:border-[#ff3f81]"
                  />
                </div>

                <div className="flex items-center gap-3 pt-6">
                  <input
                    type="checkbox"
                    id="isVisibleCheck"
                    checked={isVisible}
                    onChange={(e) => setIsVisible(e.target.checked)}
                    className="w-4 h-4 rounded text-[#ff3f81] bg-[#19153c] border-[#e1bee7]/20 focus:ring-[#ff3f81]"
                  />
                  <label htmlFor="isVisibleCheck" className="text-xs font-semibold text-gray-300 cursor-pointer">
                    Visible on Public Portfolio
                  </label>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-6 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 text-xs font-semibold transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isPending}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#ff3f81] hover:bg-[#e0326f] text-white text-xs font-semibold shadow-md shadow-[#ff3f81]/30 transition-all active:scale-95 disabled:opacity-50"
                >
                  {isPending && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  <span>{editingItem ? "Update Experience" : "Save Experience"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
