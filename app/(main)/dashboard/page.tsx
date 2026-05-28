"use client";

import { useState, useEffect } from "react";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { Lock, Eye, EyeOff, LayoutDashboard, BookOpen, Image as ImageIcon, Award, Users, Briefcase, Plus, Edit2, Trash2, LogOut, FileText, Upload, Link as LinkIcon, ShieldCheck, Timer, RefreshCw, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

export default function DashboardPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginStage, setLoginStage] = useState<"credentials" | "otp">("credentials");
  
  // Login input states
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [otpCode, setOtpCode] = useState("");
  
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [authLoading, setAuthLoading] = useState(false);
  
  // OTP Countdown timer
  const [timerSeconds, setTimerSeconds] = useState(300); // 5 minutes

  // Tab State
  const [activeTab, setActiveTab] = useState<"courses" | "gallery" | "alumni" | "blogs" | "seekers" | "employers">("courses");

  // Database States
  const [courses, setCourses] = useState<any[]>([]);
  const [gallery, setGallery] = useState<any[]>([]);
  const [alumni, setAlumni] = useState<any[]>([]);
  const [blogs, setBlogs] = useState<any[]>([]);
  const [seekers, setSeekers] = useState<any[]>([]);
  const [employers, setEmployers] = useState<any[]>([]);

  // Schema Cache Missing table state (PGRST205 error detection)
  const [hasSchemaError, setHasSchemaError] = useState(false);
  const [missingTableName, setMissingTableName] = useState("");

  // Loading States
  const [dbLoading, setDbLoading] = useState(false);
  const [actionSubmitting, setActionSubmitting] = useState(false);
  const [uploading, setUploading] = useState(false);

  // Modal / Form States
  const [showModal, setShowModal] = useState<"course" | "gallery" | "alumni" | "blog" | null>(null);
  const [editId, setEditId] = useState<string | null>(null);

  // Image Source Toggle states
  const [imageSource, setImageSource] = useState<"url" | "upload">("url");

  // Course Form
  const [courseForm, setCourseForm] = useState({
    title: "",
    slug: "",
    description: "",
    category: "professional",
    fee: "",
    original_fee: "",
    duration: "",
    mode: "hybrid",
    image_url: "",
  });

  // Gallery Form
  const [galleryForm, setGalleryForm] = useState({
    title: "",
    category: "workshops",
    aspect: "landscape",
    image_url: "",
  });

  // Alumni Form
  const [alumniForm, setAlumniForm] = useState({
    name: "",
    company: "",
    designation: "",
    package: "",
    image_url: "",
    testimonial: "",
  });

  // Blog Form
  const [blogForm, setBlogForm] = useState({
    title: "",
    slug: "",
    excerpt: "",
    category: "Communication",
    content: "",
    image_url: "",
    tags: "",
    author_name: "Unique Mentors",
  });

  // OTP Countdown effect
  useEffect(() => {
    if (loginStage !== "otp" || timerSeconds <= 0) return;
    const interval = setInterval(() => {
      setTimerSeconds((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [loginStage, timerSeconds]);

  // Check login session on load
  useEffect(() => {
    if (isSupabaseConfigured && supabase) {
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (session) {
          setIsLoggedIn(true);
        }
      });

      const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
        setIsLoggedIn(!!session);
      });

      return () => subscription.unsubscribe();
    } else {
      const session = localStorage.getItem("um_admin_session");
      if (session === "active_authorized") {
        setIsLoggedIn(true);
      }
    }
  }, []);

  // Fetch data depending on active tab
  useEffect(() => {
    if (!isLoggedIn) return;
    fetchTabData();
  }, [isLoggedIn, activeTab]);

  const fetchTabData = async () => {
    if (!isSupabaseConfigured || !supabase) {
      console.warn("Supabase is not configured yet.");
      return;
    }

    setDbLoading(true);
    setHasSchemaError(false);
    setMissingTableName("");

    try {
      let res: any;
      if (activeTab === "courses") {
        res = await supabase.from("courses").select("*").order("created_at", { ascending: false });
        if (res.error) throw res.error;
        setCourses(res.data || []);
      } else if (activeTab === "gallery") {
        res = await supabase.from("gallery").select("*").order("created_at", { ascending: false });
        if (res.error) throw res.error;
        setGallery(res.data || []);
      } else if (activeTab === "alumni") {
        res = await supabase.from("placed_students").select("*").order("created_at", { ascending: false });
        if (res.error) throw res.error;
        setAlumni(res.data || []);
      } else if (activeTab === "blogs") {
        res = await supabase.from("blogs").select("*").order("created_at", { ascending: false });
        if (res.error) throw res.error;
        setBlogs(res.data || []);
      } else if (activeTab === "seekers") {
        res = await supabase.from("job_seekers").select("*").order("created_at", { ascending: false });
        if (res.error) throw res.error;
        setSeekers(res.data || []);
      } else if (activeTab === "employers") {
        res = await supabase.from("employers").select("*").order("created_at", { ascending: false });
        if (res.error) throw res.error;
        setEmployers(res.data || []);
      }
    } catch (err: any) {
      console.error("Failed to query data from Supabase:", err);
      // Capture PGRST205 missing table schema cache errors gracefully
      if (err.code === "PGRST205" || (err.message && err.message.includes("Could not find the table"))) {
        setHasSchemaError(true);
        // Deduce missing table name based on active workspace tab
        setMissingTableName(
          activeTab === "courses" 
            ? "courses" 
            : activeTab === "gallery" 
            ? "gallery" 
            : activeTab === "alumni" 
            ? "placed_students" 
            : activeTab === "blogs" 
            ? "blogs" 
            : activeTab === "seekers" 
            ? "job_seekers" 
            : "employers"
        );
      }
    } finally {
      setDbLoading(false);
    }
  };

  // Step 1: Submit Credentials & trigger OTP
  const handleCredentialsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    setAuthLoading(true);

    try {
      const response = await fetch("/api/auth/otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "send",
          email: username,
          password: password,
        }),
      });

      const resData = await response.json();

      if (!response.ok) {
        throw new Error(resData.error || "Failed to validate credentials.");
      }

      if (resData.otp_sent) {
        setLoginStage("otp");
        setTimerSeconds(300); // start 5-minute timer
      }
    } catch (err: any) {
      console.error(err);
      setLoginError(err.message || "Invalid administrator credentials.");
    } finally {
      setAuthLoading(false);
    }
  };

  // Step 2: Submit OTP & establish authorized browser session
  const handleOtpVerificationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    setAuthLoading(true);

    if (timerSeconds <= 0) {
      setLoginError("Verification token expired. Please request a new OTP code.");
      setAuthLoading(false);
      return;
    }

    try {
      // 1. Verify OTP code against local store
      const response = await fetch("/api/auth/otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "verify",
          code: otpCode,
        }),
      });

      const resData = await response.json();

      if (!response.ok) {
        throw new Error(resData.error || "Invalid verification code.");
      }

      if (resData.verified) {
        // 2. OTP matches! Now trigger real browser sign-in or set fallback token
        if (isSupabaseConfigured && supabase) {
          const { error } = await supabase.auth.signInWithPassword({
            email: username,
            password: password,
          });
          if (error) throw error;
        } else {
          localStorage.setItem("um_admin_session", "active_authorized");
          setIsLoggedIn(true);
        }
      }
    } catch (err: any) {
      console.error(err);
      setLoginError(err.message || "Invalid or expired verification code.");
    } finally {
      setAuthLoading(false);
    }
  };

  // Resend OTP code
  const handleResendOtp = async () => {
    setLoginError("");
    setTimerSeconds(300);
    setOtpCode("");
    
    try {
      const response = await fetch("/api/auth/otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "send",
          email: username,
          password: password,
        }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Failed to resend code.");
      alert("Verification code resent successfully to your registered email address.");
    } catch (err: any) {
      setLoginError(err.message || "Failed to resend code.");
    }
  };

  // Logout handler
  const handleLogout = async () => {
    if (isSupabaseConfigured && supabase) {
      await supabase.auth.signOut();
    }
    setIsLoggedIn(false);
    setLoginStage("credentials");
    setUsername("");
    setPassword("");
    setOtpCode("");
    localStorage.removeItem("um_admin_session");
  };

  // File Upload utility calling Supabase Storage
  const handleImageFileUpload = async (file: File, onUploadSuccess: (url: string) => void) => {
    if (!isSupabaseConfigured || !supabase) {
      alert("File uploads require an active, configured Supabase project.");
      return;
    }

    setUploading(true);
    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
      const filePath = `uploads/${fileName}`;

      const { error: uploadErr } = await supabase.storage
        .from("unique-mentors-media")
        .upload(filePath, file);

      if (uploadErr) {
        if (uploadErr.message.includes("not found") || uploadErr.message.includes("Bucket")) {
          throw new Error("Public Storage bucket 'unique-mentors-media' not found on your Supabase backend. Please create a public bucket named 'unique-mentors-media' in your Supabase Storage dashboard, or paste an image URL instead.");
        }
        throw uploadErr;
      }

      const { data } = supabase.storage
        .from("unique-mentors-media")
        .getPublicUrl(filePath);

      onUploadSuccess(data.publicUrl);
    } catch (err: any) {
      console.error(err);
      alert(err.message || "Failed to upload image file to Supabase Storage.");
    } finally {
      setUploading(false);
    }
  };

  // CRUD Submissions
  const handleCourseSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!supabase) return;
    setActionSubmitting(true);

    try {
      const payload = {
        title: courseForm.title,
        slug: courseForm.slug || courseForm.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
        description: courseForm.description,
        category: courseForm.category,
        fee: Number(courseForm.fee),
        original_fee: courseForm.original_fee ? Number(courseForm.original_fee) : null,
        duration: courseForm.duration,
        mode: courseForm.mode,
        image_url: courseForm.image_url,
      };

      if (editId) {
        const { error } = await supabase.from("courses").update(payload).eq("id", editId);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("courses").insert(payload);
        if (error) throw error;
      }

      setShowModal(null);
      setEditId(null);
      setCourseForm({
        title: "",
        slug: "",
        description: "",
        category: "professional",
        fee: "",
        original_fee: "",
        duration: "",
        mode: "hybrid",
        image_url: "",
      });
      fetchTabData();
    } catch (err: any) {
      alert("Failed to submit course data: " + err.message);
    } finally {
      setActionSubmitting(false);
    }
  };

  const handleGallerySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!supabase) return;
    setActionSubmitting(true);

    try {
      const payload = {
        title: galleryForm.title,
        category: galleryForm.category,
        aspect: galleryForm.aspect,
        image_url: galleryForm.image_url,
      };

      if (editId) {
        const { error } = await supabase.from("gallery").update(payload).eq("id", editId);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("gallery").insert(payload);
        if (error) throw error;
      }

      setShowModal(null);
      setEditId(null);
      setGalleryForm({
        title: "",
        category: "workshops",
        aspect: "landscape",
        image_url: "",
      });
      fetchTabData();
    } catch (err: any) {
      alert("Failed to submit gallery data: " + err.message);
    } finally {
      setActionSubmitting(false);
    }
  };

  const handleAlumniSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!supabase) return;
    setActionSubmitting(true);

    try {
      const payload = {
        name: alumniForm.name,
        company: alumniForm.company,
        designation: alumniForm.designation,
        package: alumniForm.package || null,
        image_url: alumniForm.image_url,
        testimonial: alumniForm.testimonial || null,
      };

      if (editId) {
        const { error } = await supabase.from("placed_students").update(payload).eq("id", editId);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("placed_students").insert(payload);
        if (error) throw error;
      }

      setShowModal(null);
      setEditId(null);
      setAlumniForm({
        name: "",
        company: "",
        designation: "",
        package: "",
        image_url: "",
        testimonial: "",
      });
      fetchTabData();
    } catch (err: any) {
      alert("Failed to submit alumni data: " + err.message);
    } finally {
      setActionSubmitting(false);
    }
  };

  const handleBlogSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!supabase) return;
    setActionSubmitting(true);

    try {
      const parsedTags = blogForm.tags
        ? blogForm.tags.split(",").map((t) => t.trim()).filter(Boolean)
        : [];

      const payload = {
        title: blogForm.title,
        slug: blogForm.slug || blogForm.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
        excerpt: blogForm.excerpt,
        category: blogForm.category,
        content: blogForm.content,
        image_url: blogForm.image_url,
        tags: parsedTags,
        author_name: blogForm.author_name,
        published_at: new Date().toISOString(),
      };

      if (editId) {
        const { error } = await supabase.from("blogs").update(payload).eq("id", editId);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("blogs").insert(payload);
        if (error) throw error;
      }

      setShowModal(null);
      setEditId(null);
      setBlogForm({
        title: "",
        slug: "",
        excerpt: "",
        category: "Communication",
        content: "",
        image_url: "",
        tags: "",
        author_name: "Unique Mentors",
      });
      fetchTabData();
    } catch (err: any) {
      alert("Failed to submit blog data: " + err.message);
    } finally {
      setActionSubmitting(false);
    }
  };

  // Delete Action
  const handleDelete = async (table: string, id: string) => {
    if (!supabase) return;
    if (!confirm("Are you sure you want to delete this record? This action is permanent.")) return;

    try {
      const { error } = await supabase.from(table).delete().eq("id", id);
      if (error) throw error;
      fetchTabData();
    } catch (err: any) {
      alert("Failed to delete record: " + err.message);
    }
  };

  // Open Edit Modals
  const openEditCourse = (item: any) => {
    setEditId(item.id);
    setImageSource("url");
    setCourseForm({
      title: item.title,
      slug: item.slug,
      description: item.description,
      category: item.category,
      fee: String(item.fee),
      original_fee: item.original_fee ? String(item.original_fee) : "",
      duration: item.duration,
      mode: item.mode,
      image_url: item.image_url,
    });
    setShowModal("course");
  };

  const openEditGallery = (item: any) => {
    setEditId(item.id);
    setImageSource("url");
    setGalleryForm({
      title: item.title,
      category: item.category,
      aspect: item.aspect || "landscape",
      image_url: item.image_url,
    });
    setShowModal("gallery");
  };

  const openEditAlumni = (item: any) => {
    setEditId(item.id);
    setImageSource("url");
    setAlumniForm({
      name: item.name,
      company: item.company,
      designation: item.designation,
      package: item.package || "",
      image_url: item.image_url,
      testimonial: item.testimonial || "",
    });
    setShowModal("alumni");
  };

  const openEditBlog = (item: any) => {
    setEditId(item.id);
    setImageSource("url");
    setBlogForm({
      title: item.title,
      slug: item.slug,
      excerpt: item.excerpt,
      category: item.category,
      content: item.content,
      image_url: item.image_url,
      tags: Array.isArray(item.tags) ? item.tags.join(", ") : "",
      author_name: item.author_name || "Unique Mentors",
    });
    setShowModal("blog");
  };

  // Format 2FA Countdown timer seconds
  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  // Two-Step Authentication Guard Panels (MFA / 2FA View Wizard)
  if (!isLoggedIn) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-surface p-4 text-on-surface">
        <div className="w-full max-w-md bg-surface-container-lowest border border-outline-variant/30 rounded-3xl p-8 shadow-xl">
          
          {/* STAGE 1: Standard Credentials Input */}
          {loginStage === "credentials" ? (
            <>
              <div className="text-center mb-8">
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary mb-4">
                  <Lock className="h-6 w-6" />
                </div>
                <h1 className="text-2xl font-extrabold text-on-surface font-heading">UM Management Console</h1>
                <p className="text-sm text-on-surface-variant mt-1.5 font-semibold">
                  {isSupabaseConfigured ? "Sign in using secure Supabase credentials." : "Enter fallback credentials to gain console access."}
                </p>
              </div>

              {loginError && (
                <div className="p-4 bg-error/10 border border-error/30 text-error text-xs rounded-xl font-bold mb-6">
                  {loginError}
                </div>
              )}

              <form onSubmit={handleCredentialsSubmit} className="space-y-5">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">
                    {isSupabaseConfigured ? "Admin Email Address" : "Admin Username"}
                  </label>
                  <input
                    type={isSupabaseConfigured ? "email" : "text"}
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full bg-surface-container border border-outline-variant/30 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-primary"
                    placeholder={isSupabaseConfigured ? "admin@uniquementors.com" : "admin"}
                  />
                </div>

                <div className="space-y-2 relative">
                  <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Security Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-surface-container border border-outline-variant/30 rounded-xl pl-4 pr-12 py-3.5 text-sm focus:outline-none focus:border-primary"
                      placeholder="••••••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-on-surface cursor-pointer"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={authLoading}
                  className="w-full bg-primary hover:bg-primary-container text-white py-3.5 px-6 rounded-xl font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md mt-6"
                >
                  {authLoading ? "Validating Account..." : "Continue with 2FA"}
                </button>
              </form>
            </>
          ) : (
            /* STAGE 2: Secure OTP Code verification */
            <>
              <div className="text-center mb-8">
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary mb-4">
                  <ShieldCheck className="h-6 w-6 animate-bounce" />
                </div>
                <h1 className="text-2xl font-extrabold text-on-surface font-heading">Verify Your Identity</h1>
                <p className="text-sm text-on-surface-variant mt-1.5 font-semibold">
                  A secure 6-digit verification code has been dispatched to <strong>uniquementors.webapp@gmail.com</strong>.
                </p>
              </div>

              {loginError && (
                <div className="p-4 bg-error/10 border border-error/30 text-error text-xs rounded-xl font-bold mb-6">
                  {loginError}
                </div>
              )}

              <form onSubmit={handleOtpVerificationSubmit} className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Verification OTP Code</label>
                    <div className="flex items-center gap-1 text-xs font-bold text-primary">
                      <Timer className="h-3.5 w-3.5" />
                      <span>{formatTimer(timerSeconds)}</span>
                    </div>
                  </div>
                  <input
                    type="text"
                    required
                    maxLength={6}
                    pattern="[0-9]{6}"
                    value={otpCode}
                    onChange={(e) => setOtpCode(e.target.value.replace(/[^0-9]/g, ""))}
                    className="w-full bg-surface-container border border-outline-variant/30 rounded-xl px-4 py-3.5 text-center text-xl font-bold tracking-widest focus:outline-none focus:border-primary"
                    placeholder="000000"
                  />
                </div>

                <button
                  type="submit"
                  disabled={authLoading || timerSeconds <= 0}
                  className="w-full bg-primary hover:bg-primary-container text-white py-3.5 px-6 rounded-xl font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  {authLoading ? "Verifying..." : "Verify & Access Console"}
                </button>

                <div className="text-center pt-2">
                  <button
                    type="button"
                    onClick={handleResendOtp}
                    className="text-xs font-bold text-primary hover:underline inline-flex items-center gap-1.5 cursor-pointer"
                  >
                    <RefreshCw className="h-3 w-3" /> Resend OTP Code
                  </button>
                </div>
              </form>
            </>
          )}

        </div>
      </section>
    );
  }

  return (
    <section className="section-padding bg-surface">
      <div className="container-main max-w-7xl mx-auto px-4 py-12">
        
        {/* Top Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-outline-variant/30 pb-8 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <LayoutDashboard className="h-5 w-5 text-primary" />
              <span className="text-xs font-extrabold uppercase tracking-wider text-primary">ADMIN CONTROL CONSOLE</span>
            </div>
            <h1 className="text-3xl font-extrabold text-on-surface font-heading">Database Operations Room</h1>
          </div>
          
          <div className="flex items-center gap-4">
            <span className={cn(
              "inline-flex items-center gap-1 text-xs font-bold py-1.5 px-4 rounded-full border shadow-sm",
              isSupabaseConfigured 
                ? "bg-success/5 border-success/20 text-success" 
                : "bg-warning/5 border-warning/20 text-warning"
            )}>
              <span className={cn("h-2 w-2 rounded-full", isSupabaseConfigured ? "bg-success" : "bg-warning")} />
              {isSupabaseConfigured ? "Supabase Connected & 2FA Active" : "Local Mock Sandbox (Read Only)"}
            </span>
            
            <button
              onClick={handleLogout}
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-error/10 hover:bg-error/20 border border-error/15 rounded-xl text-xs font-bold text-error cursor-pointer transition-colors"
            >
              Sign Out
              <LogOut className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {/* Dashboard Workspace */}
        <div className="grid lg:grid-cols-4 gap-8">
          
          {/* Sidebar */}
          <div className="space-y-2 lg:col-span-1">
            {[
              { id: "courses", label: "Manage Courses", icon: BookOpen },
              { id: "gallery", label: "Manage Gallery", icon: ImageIcon },
              { id: "alumni", label: "Placed Alumni", icon: Award },
              { id: "blogs", label: "Manage Blogs", icon: FileText },
              { id: "seekers", label: "Job Seekers", icon: Users },
              { id: "employers", label: "Talent Requests", icon: Briefcase },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold border transition-all text-left cursor-pointer",
                  activeTab === tab.id
                    ? "bg-primary text-white border-primary shadow-sm"
                    : "bg-surface hover:bg-primary/5 text-on-surface border-outline-variant/20"
                )}
              >
                <tab.icon className="h-4.5 w-4.5" />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Table workspaces */}
          <div className="lg:col-span-3 bg-surface-container-lowest border border-outline-variant/30 rounded-3xl p-6 md:p-8 shadow-md">
            
            <div className="flex items-center justify-between border-b border-outline-variant/20 pb-4 mb-6">
              <h2 className="text-xl font-extrabold text-on-surface capitalize">{activeTab} Workspace</h2>
              
              {["courses", "gallery", "alumni", "blogs"].includes(activeTab) && isSupabaseConfigured && !hasSchemaError && (
                <button
                  onClick={() => {
                    setEditId(null);
                    setImageSource("url");
                    if (activeTab === "courses") setShowModal("course");
                    else if (activeTab === "gallery") setShowModal("gallery");
                    else if (activeTab === "alumni") setShowModal("alumni");
                    else if (activeTab === "blogs") setShowModal("blog");
                  }}
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-primary hover:bg-primary-container text-white rounded-xl text-xs font-bold cursor-pointer transition-colors shadow-sm"
                >
                  <Plus className="h-3.5 w-3.5" />
                  Add New
                </button>
              )}
            </div>

            {!isSupabaseConfigured && (
              <div className="p-5 bg-warning/5 border border-warning/20 text-warning-container text-sm rounded-2xl mb-6">
                <h4 className="font-bold mb-1">💡 Supabase Config Missing</h4>
                <p className="text-xs leading-relaxed opacity-90">To perform edits, inserts, or file uploads, you need to configure your Supabase Credentials in <strong>.env.local</strong>.</p>
              </div>
            )}

            {/* GRACEFUL SCHEMA ERROR DIAGNOSTICS (PGRST205 RESOLVER PANEL) */}
            {hasSchemaError ? (
              <div className="p-6 bg-error/5 border border-error/20 rounded-2xl text-on-surface">
                <div className="flex items-center gap-3 text-error mb-4">
                  <AlertTriangle className="h-6 w-6 animate-pulse" />
                  <h3 className="text-lg font-extrabold font-heading">Database Table Missing (Error PGRST205)</h3>
                </div>
                
                <p className="text-sm leading-relaxed mb-6">
                  Supabase successfully authenticated your handshake, but the table <strong>&ldquo;{missingTableName}&rdquo;</strong> could not be located in your database schema cache.
                </p>

                <div className="bg-surface-container border border-outline-variant/30 rounded-2xl p-5 mb-6">
                  <h4 className="text-xs font-extrabold text-on-surface-variant uppercase tracking-wider mb-2">💡 How to Fix Instantly:</h4>
                  <ol className="text-xs space-y-2 list-decimal pl-4 leading-relaxed text-on-surface-variant font-semibold">
                    <li>Go to your <strong>Supabase Dashboard</strong>.</li>
                    <li>Click on the <strong>SQL Editor</strong> tab on the left sidebar.</li>
                    <li>Open <strong>New Query</strong>, copy the SQL table creation block from your [walkthrough.md](file:///Users/harishs/.gemini/antigravity-ide/brain/5b853b3d-a84f-4007-8cd1-bd0862a0ec84/walkthrough.md#L41-L151) file, paste it inside, and click <strong>Run</strong>.</li>
                    <li>Once successfully completed, refresh this workspace to begin managing live data.</li>
                  </ol>
                </div>

                <div className="flex justify-start">
                  <button
                    onClick={fetchTabData}
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-primary text-white rounded-xl text-xs font-bold cursor-pointer hover:bg-primary-container transition-all shadow-sm"
                  >
                    <RefreshCw className="h-3.5 w-3.5" />
                    Verify Table Presence
                  </button>
                </div>
              </div>
            ) : dbLoading ? (
              <div className="flex justify-center py-20">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
            ) : (
              <div className="overflow-x-auto">
                {/* Courses Table */}
                {activeTab === "courses" && (
                  <table className="w-full text-left text-sm border-collapse">
                    <thead>
                      <tr className="border-b border-outline-variant/20 text-xs font-bold text-on-surface-variant uppercase tracking-wider">
                        <th className="py-3 px-2">Image</th>
                        <th className="py-3 px-2">Course Name</th>
                        <th className="py-3 px-2">Category</th>
                        <th className="py-3 px-2">Mode</th>
                        <th className="py-3 px-2">Fee</th>
                        <th className="py-3 px-2 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {courses.length === 0 ? (
                        <tr><td colSpan={6} className="py-8 text-center text-on-surface-variant font-semibold">No active courses in database.</td></tr>
                      ) : (
                        courses.map((item) => (
                          <tr key={item.id} className="border-b border-outline-variant/10 hover:bg-surface-container/20">
                            <td className="py-3 px-2">
                              <img src={item.image_url} alt="" className="h-10 w-16 object-cover rounded-lg border" />
                            </td>
                            <td className="py-3 px-2 font-bold text-on-surface">{item.title}</td>
                            <td className="py-3 px-2 capitalize">{item.category}</td>
                            <td className="py-3 px-2 capitalize">{item.mode}</td>
                            <td className="py-3 px-2 font-semibold">₹{item.fee}</td>
                            <td className="py-3 px-2 text-right">
                              {isSupabaseConfigured && (
                                <div className="inline-flex gap-2">
                                  <button onClick={() => openEditCourse(item)} className="p-1.5 bg-primary/10 text-primary hover:bg-primary/20 rounded-lg cursor-pointer"><Edit2 className="h-3.5 w-3.5" /></button>
                                  <button onClick={() => handleDelete("courses", item.id)} className="p-1.5 bg-error/10 text-error hover:bg-error/20 rounded-lg cursor-pointer"><Trash2 className="h-3.5 w-3.5" /></button>
                                </div>
                              )}
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                )}

                {/* Gallery Table */}
                {activeTab === "gallery" && (
                  <table className="w-full text-left text-sm border-collapse">
                    <thead>
                      <tr className="border-b border-outline-variant/20 text-xs font-bold text-on-surface-variant uppercase tracking-wider">
                        <th className="py-3 px-2">Preview</th>
                        <th className="py-3 px-2">Title</th>
                        <th className="py-3 px-2">Category</th>
                        <th className="py-3 px-2">Aspect</th>
                        <th className="py-3 px-2 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {gallery.length === 0 ? (
                        <tr><td colSpan={5} className="py-8 text-center text-on-surface-variant font-semibold">No active images in database.</td></tr>
                      ) : (
                        gallery.map((item) => (
                          <tr key={item.id} className="border-b border-outline-variant/10 hover:bg-surface-container/20">
                            <td className="py-3 px-2">
                              <img src={item.image_url} alt="" className="h-12 w-12 object-cover rounded-lg border" />
                            </td>
                            <td className="py-3 px-2 font-bold text-on-surface">{item.title}</td>
                            <td className="py-3 px-2 capitalize">{item.category}</td>
                            <td className="py-3 px-2 capitalize">{item.aspect}</td>
                            <td className="py-3 px-2 text-right">
                              {isSupabaseConfigured && (
                                <div className="inline-flex gap-2">
                                  <button onClick={() => openEditGallery(item)} className="p-1.5 bg-primary/10 text-primary hover:bg-primary/20 rounded-lg cursor-pointer"><Edit2 className="h-3.5 w-3.5" /></button>
                                  <button onClick={() => handleDelete("gallery", item.id)} className="p-1.5 bg-error/10 text-error hover:bg-error/20 rounded-lg cursor-pointer"><Trash2 className="h-3.5 w-3.5" /></button>
                                </div>
                              )}
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                )}

                {/* Placed Alumni Table */}
                {activeTab === "alumni" && (
                  <table className="w-full text-left text-sm border-collapse">
                    <thead>
                      <tr className="border-b border-outline-variant/20 text-xs font-bold text-on-surface-variant uppercase tracking-wider">
                        <th className="py-3 px-2">Avatar</th>
                        <th className="py-3 px-2">Name</th>
                        <th className="py-3 px-2">Company</th>
                        <th className="py-3 px-2">Designation</th>
                        <th className="py-3 px-2">Package</th>
                        <th className="py-3 px-2 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {alumni.length === 0 ? (
                        <tr><td colSpan={6} className="py-8 text-center text-on-surface-variant font-semibold">No active placed student profiles in database.</td></tr>
                      ) : (
                        alumni.map((item) => (
                          <tr key={item.id} className="border-b border-outline-variant/10 hover:bg-surface-container/20">
                            <td className="py-3 px-2">
                              <img src={item.image_url} alt="" className="h-10 w-10 object-cover rounded-full border" />
                            </td>
                            <td className="py-3 px-2 font-bold text-on-surface">{item.name}</td>
                            <td className="py-3 px-2 font-semibold text-primary">{item.company}</td>
                            <td className="py-3 px-2">{item.designation}</td>
                            <td className="py-3 px-2 font-semibold text-success">{item.package || "N/A"}</td>
                            <td className="py-3 px-2 text-right">
                              {isSupabaseConfigured && (
                                <div className="inline-flex gap-2">
                                  <button onClick={() => openEditAlumni(item)} className="p-1.5 bg-primary/10 text-primary hover:bg-primary/20 rounded-lg cursor-pointer"><Edit2 className="h-3.5 w-3.5" /></button>
                                  <button onClick={() => handleDelete("placed_students", item.id)} className="p-1.5 bg-error/10 text-error hover:bg-error/20 rounded-lg cursor-pointer"><Trash2 className="h-3.5 w-3.5" /></button>
                                </div>
                              )}
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                )}

                {/* Manage Blogs Table */}
                {activeTab === "blogs" && (
                  <table className="w-full text-left text-sm border-collapse">
                    <thead>
                      <tr className="border-b border-outline-variant/20 text-xs font-bold text-on-surface-variant uppercase tracking-wider">
                        <th className="py-3 px-2">Image</th>
                        <th className="py-3 px-2">Blog Title</th>
                        <th className="py-3 px-2">Category</th>
                        <th className="py-3 px-2">Published</th>
                        <th className="py-3 px-2 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {blogs.length === 0 ? (
                        <tr><td colSpan={5} className="py-8 text-center text-on-surface-variant font-semibold">No active blog posts in database.</td></tr>
                      ) : (
                        blogs.map((item) => (
                          <tr key={item.id} className="border-b border-outline-variant/10 hover:bg-surface-container/20">
                            <td className="py-3 px-2">
                              <img src={item.image_url} alt="" className="h-10 w-16 object-cover rounded-lg border" />
                            </td>
                            <td className="py-3 px-2 font-bold text-on-surface max-w-[200px] truncate">{item.title}</td>
                            <td className="py-3 px-2 capitalize">{item.category}</td>
                            <td className="py-3 px-2">{new Date(item.published_at).toLocaleDateString()}</td>
                            <td className="py-3 px-2 text-right">
                              {isSupabaseConfigured && (
                                <div className="inline-flex gap-2">
                                  <button onClick={() => openEditBlog(item)} className="p-1.5 bg-primary/10 text-primary hover:bg-primary/20 rounded-lg cursor-pointer"><Edit2 className="h-3.5 w-3.5" /></button>
                                  <button onClick={() => handleDelete("blogs", item.id)} className="p-1.5 bg-error/10 text-error hover:bg-error/20 rounded-lg cursor-pointer"><Trash2 className="h-3.5 w-3.5" /></button>
                                </div>
                              )}
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                )}

                {/* Job Seekers applications */}
                {activeTab === "seekers" && (
                  <table className="w-full text-left text-sm border-collapse">
                    <thead>
                      <tr className="border-b border-outline-variant/20 text-xs font-bold text-on-surface-variant uppercase tracking-wider">
                        <th className="py-3 px-2">Candidate</th>
                        <th className="py-3 px-2">Contact Details</th>
                        <th className="py-3 px-2">Qualification</th>
                        <th className="py-3 px-2">Experience</th>
                        <th className="py-3 px-2">Skills</th>
                        <th className="py-3 px-2">Profile Details</th>
                        <th className="py-3 px-2 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {seekers.length === 0 ? (
                        <tr><td colSpan={7} className="py-8 text-center text-on-surface-variant font-semibold">No seeker applications captured yet.</td></tr>
                      ) : (
                        seekers.map((item) => (
                          <tr key={item.id} className="border-b border-outline-variant/10 hover:bg-surface-container/20">
                            <td className="py-3 px-2 font-bold text-on-surface">{item.name}</td>
                            <td className="py-3 px-2 text-xs">
                              <div>{item.email}</div>
                              <div className="text-on-surface-variant font-semibold mt-0.5">{item.phone}</div>
                            </td>
                            <td className="py-3 px-2">{item.qualification}</td>
                            <td className="py-3 px-2 capitalize">{item.experience}</td>
                            <td className="py-3 px-2 text-xs max-w-[120px] truncate">{item.skills}</td>
                            <td className="py-3 px-2 text-xs text-on-surface-variant leading-relaxed max-w-[180px] truncate">{item.resume_text || "None Provided"}</td>
                            <td className="py-3 px-2 text-right">
                              {isSupabaseConfigured && (
                                <button onClick={() => handleDelete("job_seekers", item.id)} className="p-1.5 bg-error/10 text-error hover:bg-error/20 rounded-lg cursor-pointer"><Trash2 className="h-3.5 w-3.5" /></button>
                              )}
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                )}

                {/* Hiring Request leads */}
                {activeTab === "employers" && (
                  <table className="w-full text-left text-sm border-collapse">
                    <thead>
                      <tr className="border-b border-outline-variant/20 text-xs font-bold text-on-surface-variant uppercase tracking-wider">
                        <th className="py-3 px-2">Company</th>
                        <th className="py-3 px-2">Contact Person</th>
                        <th className="py-3 px-2">Contact Details</th>
                        <th className="py-3 px-2">Role Needed</th>
                        <th className="py-3 px-2">Locations</th>
                        <th className="py-3 px-2">Budget</th>
                        <th className="py-3 px-2 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {employers.length === 0 ? (
                        <tr><td colSpan={7} className="py-8 text-center text-on-surface-variant font-semibold">No employer hiring requests registered yet.</td></tr>
                      ) : (
                        employers.map((item) => (
                          <tr key={item.id} className="border-b border-outline-variant/10 hover:bg-surface-container/20">
                            <td className="py-3 px-2 font-bold text-primary">{item.company_name}</td>
                            <td className="py-3 px-2 font-semibold">{item.contact_person}</td>
                            <td className="py-3 px-2 text-xs">
                              <div>{item.email}</div>
                              <div className="text-on-surface-variant font-semibold mt-0.5">{item.phone}</div>
                            </td>
                            <td className="py-3 px-2 text-xs font-semibold">{item.designations_needed}</td>
                            <td className="py-3 px-2">{item.locations}</td>
                            <td className="py-3 px-2 font-semibold text-success">{item.salary_range}</td>
                            <td className="py-3 px-2 text-right">
                              {isSupabaseConfigured && (
                                <button onClick={() => handleDelete("employers", item.id)} className="p-1.5 bg-error/10 text-error hover:bg-error/20 rounded-lg cursor-pointer"><Trash2 className="h-3.5 w-3.5" /></button>
                              )}
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Course Edit/Add Modal */}
      {showModal === "course" && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-surface-container-lowest max-w-lg w-full rounded-3xl p-6 shadow-2xl border max-h-[90vh] overflow-y-auto text-on-surface">
            <h3 className="text-lg font-bold mb-4 font-heading">{editId ? "Edit Course" : "Add New Course"}</h3>
            <form onSubmit={handleCourseSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-on-surface-variant">Course Title</label>
                <input type="text" required value={courseForm.title} onChange={(e)=>setCourseForm({...courseForm, title:e.target.value})} className="w-full bg-surface-container border border-outline-variant/20 rounded-xl px-3 py-2 text-sm focus:outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-on-surface-variant">Slug (URL link)</label>
                <input type="text" value={courseForm.slug} onChange={(e)=>setCourseForm({...courseForm, slug:e.target.value})} className="w-full bg-surface-container border border-outline-variant/20 rounded-xl px-3 py-2 text-sm focus:outline-none" placeholder="e.g. public-speaking" />
              </div>

              {/* DUAL IMAGE SELECTOR DESK */}
              <div className="space-y-2 border border-outline-variant/20 rounded-2xl p-4 bg-surface-container-low">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-on-surface-variant">Course Thumbnail</span>
                  <div className="flex bg-surface rounded-lg p-0.5 border text-[11px] font-bold">
                    <button
                      type="button"
                      onClick={() => setImageSource("url")}
                      className={cn("px-2.5 py-1 rounded-md transition-all flex items-center gap-1", imageSource === "url" ? "bg-primary text-white shadow-xs" : "text-on-surface-variant hover:text-on-surface")}
                    >
                      <LinkIcon className="h-3 w-3" /> URL Link
                    </button>
                    <button
                      type="button"
                      onClick={() => setImageSource("upload")}
                      className={cn("px-2.5 py-1 rounded-md transition-all flex items-center gap-1", imageSource === "upload" ? "bg-primary text-white shadow-xs" : "text-on-surface-variant hover:text-on-surface")}
                    >
                      <Upload className="h-3 w-3" /> Upload File
                    </button>
                  </div>
                </div>

                {imageSource === "url" ? (
                  <input
                    type="url"
                    required
                    value={courseForm.image_url}
                    onChange={(e) => setCourseForm({ ...courseForm, image_url: e.target.value })}
                    className="w-full bg-surface-container border border-outline-variant/20 rounded-xl px-3 py-2 text-sm focus:outline-none"
                    placeholder="https://images.unsplash.com/..."
                  />
                ) : (
                  <div className="space-y-2">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          await handleImageFileUpload(file, (url) => {
                            setCourseForm({ ...courseForm, image_url: url });
                          });
                        }
                      }}
                      className="w-full text-xs file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-primary file:text-white hover:file:bg-primary-container cursor-pointer"
                    />
                    {uploading && <div className="text-xs text-primary font-semibold animate-pulse">Uploading file to Supabase Storage...</div>}
                    {courseForm.image_url && <div className="text-[11px] text-success font-semibold truncate">Loaded: {courseForm.image_url}</div>}
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-on-surface-variant">Category</label>
                  <select value={courseForm.category} onChange={(e)=>setCourseForm({...courseForm, category:e.target.value as any})} className="w-full bg-surface-container border border-outline-variant/20 rounded-xl px-3 py-2 text-sm focus:outline-none">
                    <option value="school">School</option>
                    <option value="college">College</option>
                    <option value="healthcare">Healthcare</option>
                    <option value="professional">Professional</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-on-surface-variant">Learning Mode</label>
                  <select value={courseForm.mode} onChange={(e)=>setCourseForm({...courseForm, mode:e.target.value as any})} className="w-full bg-surface-container border border-outline-variant/20 rounded-xl px-3 py-2 text-sm focus:outline-none">
                    <option value="online">Online</option>
                    <option value="offline">Offline</option>
                    <option value="hybrid">Hybrid</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-on-surface-variant">Fee (INR)</label>
                  <input type="number" required value={courseForm.fee} onChange={(e)=>setCourseForm({...courseForm, fee:e.target.value})} className="w-full bg-surface-container border border-outline-variant/20 rounded-xl px-3 py-2 text-sm focus:outline-none" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-on-surface-variant">Original Fee</label>
                  <input type="number" value={courseForm.original_fee} onChange={(e)=>setCourseForm({...courseForm, original_fee:e.target.value})} className="w-full bg-surface-container border border-outline-variant/20 rounded-xl px-3 py-2 text-sm focus:outline-none" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-on-surface-variant">Duration</label>
                  <input type="text" required value={courseForm.duration} onChange={(e)=>setCourseForm({...courseForm, duration:e.target.value})} className="w-full bg-surface-container border border-outline-variant/20 rounded-xl px-3 py-2 text-sm focus:outline-none" placeholder="e.g. 6 weeks" />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-on-surface-variant">Description</label>
                <textarea rows={3} required value={courseForm.description} onChange={(e)=>setCourseForm({...courseForm, description:e.target.value})} className="w-full bg-surface-container border border-outline-variant/20 rounded-xl px-3 py-2 text-sm focus:outline-none resize-none" />
              </div>
              <div className="flex gap-4 pt-4 border-t">
                <button type="button" onClick={()=>setShowModal(null)} className="flex-1 bg-surface hover:bg-surface-container border py-2.5 rounded-xl font-bold text-sm cursor-pointer">Cancel</button>
                <button type="submit" disabled={actionSubmitting || uploading} className="flex-1 bg-primary text-white py-2.5 rounded-xl font-bold text-sm cursor-pointer">{actionSubmitting ? "Submitting..." : "Save Course"}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Gallery Edit/Add Modal */}
      {showModal === "gallery" && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-surface-container-lowest max-w-md w-full rounded-3xl p-6 shadow-2xl border text-on-surface">
            <h3 className="text-lg font-bold mb-4 font-heading">{editId ? "Edit Image" : "Add Image to Gallery"}</h3>
            <form onSubmit={handleGallerySubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-on-surface-variant">Image Title</label>
                <input type="text" required value={galleryForm.title} onChange={(e)=>setGalleryForm({...galleryForm, title:e.target.value})} className="w-full bg-surface-container border border-outline-variant/20 rounded-xl px-3 py-2 text-sm focus:outline-none" />
              </div>

              {/* DUAL IMAGE SELECTOR GALLERY */}
              <div className="space-y-2 border border-outline-variant/20 rounded-2xl p-4 bg-surface-container-low">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-on-surface-variant">Image File Source</span>
                  <div className="flex bg-surface rounded-lg p-0.5 border text-[11px] font-bold">
                    <button
                      type="button"
                      onClick={() => setImageSource("url")}
                      className={cn("px-2.5 py-1 rounded-md transition-all flex items-center gap-1", imageSource === "url" ? "bg-primary text-white shadow-xs" : "text-on-surface-variant hover:text-on-surface")}
                    >
                      <LinkIcon className="h-3 w-3" /> URL Link
                    </button>
                    <button
                      type="button"
                      onClick={() => setImageSource("upload")}
                      className={cn("px-2.5 py-1 rounded-md transition-all flex items-center gap-1", imageSource === "upload" ? "bg-primary text-white shadow-xs" : "text-on-surface-variant hover:text-on-surface")}
                    >
                      <Upload className="h-3 w-3" /> Upload File
                    </button>
                  </div>
                </div>

                {imageSource === "url" ? (
                  <input
                    type="url"
                    required
                    value={galleryForm.image_url}
                    onChange={(e) => setGalleryForm({ ...galleryForm, image_url: e.target.value })}
                    className="w-full bg-surface-container border border-outline-variant/20 rounded-xl px-3 py-2 text-sm focus:outline-none"
                    placeholder="https://images.unsplash.com/..."
                  />
                ) : (
                  <div className="space-y-2">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          await handleImageFileUpload(file, (url) => {
                            setGalleryForm({ ...galleryForm, image_url: url });
                          });
                        }
                      }}
                      className="w-full text-xs file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-primary file:text-white hover:file:bg-primary-container cursor-pointer"
                    />
                    {uploading && <div className="text-xs text-primary font-semibold animate-pulse">Uploading file to Supabase...</div>}
                    {galleryForm.image_url && <div className="text-[11px] text-success font-semibold truncate">Loaded: {galleryForm.image_url}</div>}
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-on-surface-variant">Category</label>
                  <select value={galleryForm.category} onChange={(e)=>setGalleryForm({...galleryForm, category:e.target.value as any})} className="w-full bg-surface-container border border-outline-variant/20 rounded-xl px-3 py-2 text-sm focus:outline-none">
                    <option value="workshops">Workshops</option>
                    <option value="events">Events</option>
                    <option value="campus">Campus</option>
                    <option value="certificates">Certificates</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-on-surface-variant">Aspect Ratio</label>
                  <select value={galleryForm.aspect} onChange={(e)=>setGalleryForm({...galleryForm, aspect:e.target.value as any})} className="w-full bg-surface-container border border-outline-variant/20 rounded-xl px-3 py-2 text-sm focus:outline-none">
                    <option value="landscape">Landscape</option>
                    <option value="portrait">Portrait</option>
                    <option value="square">Square</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-4 pt-4 border-t">
                <button type="button" onClick={()=>setShowModal(null)} className="flex-1 bg-surface hover:bg-surface-container border py-2.5 rounded-xl font-bold text-sm cursor-pointer">Cancel</button>
                <button type="submit" disabled={actionSubmitting || uploading} className="flex-1 bg-primary text-white py-2.5 rounded-xl font-bold text-sm cursor-pointer">{actionSubmitting ? "Submitting..." : "Save Image"}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Alumni Edit/Add Modal */}
      {showModal === "alumni" && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-surface-container-lowest max-w-lg w-full rounded-3xl p-6 shadow-2xl border max-h-[90vh] overflow-y-auto text-on-surface">
            <h3 className="text-lg font-bold mb-4 font-heading">{editId ? "Edit Alumni Profile" : "Add Placed Alumni Profile"}</h3>
            <form onSubmit={handleAlumniSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-on-surface-variant">Alumni Name</label>
                  <input type="text" required value={alumniForm.name} onChange={(e)=>setAlumniForm({...alumniForm, name:e.target.value})} className="w-full bg-surface-container border border-outline-variant/20 rounded-xl px-3 py-2 text-sm focus:outline-none" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-on-surface-variant">Placed Company</label>
                  <input type="text" required value={alumniForm.company} onChange={(e)=>setAlumniForm({...alumniForm, company:e.target.value})} className="w-full bg-surface-container border border-outline-variant/20 rounded-xl px-3 py-2 text-sm focus:outline-none" placeholder="e.g. TCS, Federal Bank" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-on-surface-variant">Designation</label>
                  <input type="text" required value={alumniForm.designation} onChange={(e)=>setAlumniForm({...alumniForm, designation:e.target.value})} className="w-full bg-surface-container border border-outline-variant/20 rounded-xl px-3 py-2 text-sm focus:outline-none" placeholder="e.g. Associate Officer" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-on-surface-variant">Annual Package</label>
                  <input type="text" value={alumniForm.package} onChange={(e)=>setAlumniForm({...alumniForm, package:e.target.value})} className="w-full bg-surface-container border border-outline-variant/20 rounded-xl px-3 py-2 text-sm focus:outline-none" placeholder="e.g. 5.8 LPA" />
                </div>
              </div>

              {/* DUAL IMAGE SELECTOR ALUMNI */}
              <div className="space-y-2 border border-outline-variant/20 rounded-2xl p-4 bg-surface-container-low">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-on-surface-variant">Profile Photo Source</span>
                  <div className="flex bg-surface rounded-lg p-0.5 border text-[11px] font-bold">
                    <button
                      type="button"
                      onClick={() => setImageSource("url")}
                      className={cn("px-2.5 py-1 rounded-md transition-all flex items-center gap-1", imageSource === "url" ? "bg-primary text-white shadow-xs" : "text-on-surface-variant hover:text-on-surface")}
                    >
                      <LinkIcon className="h-3 w-3" /> URL Link
                    </button>
                    <button
                      type="button"
                      onClick={() => setImageSource("upload")}
                      className={cn("px-2.5 py-1 rounded-md transition-all flex items-center gap-1", imageSource === "upload" ? "bg-primary text-white shadow-xs" : "text-on-surface-variant hover:text-on-surface")}
                    >
                      <Upload className="h-3 w-3" /> Upload File
                    </button>
                  </div>
                </div>

                {imageSource === "url" ? (
                  <input
                    type="url"
                    required
                    value={alumniForm.image_url}
                    onChange={(e) => setAlumniForm({ ...alumniForm, image_url: e.target.value })}
                    className="w-full bg-surface-container border border-outline-variant/20 rounded-xl px-3 py-2 text-sm focus:outline-none"
                    placeholder="https://images.unsplash.com/..."
                  />
                ) : (
                  <div className="space-y-2">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          await handleImageFileUpload(file, (url) => {
                            setAlumniForm({ ...alumniForm, image_url: url });
                          });
                        }
                      }}
                      className="w-full text-xs file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-primary file:text-white hover:file:bg-primary-container cursor-pointer"
                    />
                    {uploading && <div className="text-xs text-primary font-semibold animate-pulse">Uploading file...</div>}
                    {alumniForm.image_url && <div className="text-[11px] text-success font-semibold truncate">Loaded: {alumniForm.image_url}</div>}
                  </div>
                )}
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-on-surface-variant">Success Testimonial</label>
                <textarea rows={3} value={alumniForm.testimonial} onChange={(e)=>setAlumniForm({...alumniForm, testimonial:e.target.value})} className="w-full bg-surface-container border border-outline-variant/20 rounded-xl px-3 py-2 text-sm focus:outline-none resize-none" placeholder="Success testimonial..." />
              </div>
              <div className="flex gap-4 pt-4 border-t">
                <button type="button" onClick={()=>setShowModal(null)} className="flex-1 bg-surface hover:bg-surface-container border py-2.5 rounded-xl font-bold text-sm cursor-pointer">Cancel</button>
                <button type="submit" disabled={actionSubmitting || uploading} className="flex-1 bg-primary text-white py-2.5 rounded-xl font-bold text-sm cursor-pointer">{actionSubmitting ? "Submitting..." : "Save Alumni"}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* BLOG MODAL */}
      {showModal === "blog" && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-surface-container-lowest max-w-2xl w-full rounded-3xl p-6 shadow-2xl border max-h-[90vh] overflow-y-auto text-on-surface">
            <h3 className="text-lg font-bold mb-4 font-heading">{editId ? "Edit Blog Post" : "Add New Blog Post"}</h3>
            <form onSubmit={handleBlogSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-on-surface-variant">Blog Title</label>
                  <input type="text" required value={blogForm.title} onChange={(e)=>setBlogForm({...blogForm, title:e.target.value})} className="w-full bg-surface-container border border-outline-variant/20 rounded-xl px-3 py-2 text-sm focus:outline-none" placeholder="e.g. Stage Fright Hacks" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-on-surface-variant">Slug (URL link)</label>
                  <input type="text" value={blogForm.slug} onChange={(e)=>setBlogForm({...blogForm, slug:e.target.value})} className="w-full bg-surface-container border border-outline-variant/20 rounded-xl px-3 py-2 text-sm focus:outline-none" placeholder="e.g. stage-fright-hacks" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-on-surface-variant">Category</label>
                  <input type="text" required value={blogForm.category} onChange={(e)=>setBlogForm({...blogForm, category:e.target.value})} className="w-full bg-surface-container border border-outline-variant/20 rounded-xl px-3 py-2 text-sm focus:outline-none" placeholder="e.g. Communication, Career" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-on-surface-variant">Author Name</label>
                  <input type="text" required value={blogForm.author_name} onChange={(e)=>setBlogForm({...blogForm, author_name:e.target.value})} className="w-full bg-surface-container border border-outline-variant/20 rounded-xl px-3 py-2 text-sm focus:outline-none" />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-on-surface-variant">Tags (Comma Separated)</label>
                <input type="text" value={blogForm.tags} onChange={(e)=>setBlogForm({...blogForm, tags:e.target.value})} className="w-full bg-surface-container border border-outline-variant/20 rounded-xl px-3 py-2 text-sm focus:outline-none" placeholder="e.g. public-speaking, interview, success" />
              </div>

              {/* DUAL IMAGE SELECTOR BLOG */}
              <div className="space-y-2 border border-outline-variant/20 rounded-2xl p-4 bg-surface-container-low">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-on-surface-variant">Cover Image Source</span>
                  <div className="flex bg-surface rounded-lg p-0.5 border text-[11px] font-bold">
                    <button
                      type="button"
                      onClick={() => setImageSource("url")}
                      className={cn("px-2.5 py-1 rounded-md transition-all flex items-center gap-1", imageSource === "url" ? "bg-primary text-white shadow-xs" : "text-on-surface-variant hover:text-on-surface")}
                    >
                      <LinkIcon className="h-3 w-3" /> URL Link
                    </button>
                    <button
                      type="button"
                      onClick={() => setImageSource("upload")}
                      className={cn("px-2.5 py-1 rounded-md transition-all flex items-center gap-1", imageSource === "upload" ? "bg-primary text-white shadow-xs" : "text-on-surface-variant hover:text-on-surface")}
                    >
                      <Upload className="h-3 w-3" /> Upload File
                    </button>
                  </div>
                </div>

                {imageSource === "url" ? (
                  <input
                    type="url"
                    required
                    value={blogForm.image_url}
                    onChange={(e) => setBlogForm({ ...blogForm, image_url: e.target.value })}
                    className="w-full bg-surface-container border border-outline-variant/20 rounded-xl px-3 py-2 text-sm focus:outline-none"
                    placeholder="https://images.unsplash.com/..."
                  />
                ) : (
                  <div className="space-y-2">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          await handleImageFileUpload(file, (url) => {
                            setBlogForm({ ...blogForm, image_url: url });
                          });
                        }
                      }}
                      className="w-full text-xs file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-primary file:text-white hover:file:bg-primary-container cursor-pointer"
                    />
                    {uploading && <div className="text-xs text-primary font-semibold animate-pulse">Uploading cover image...</div>}
                    {blogForm.image_url && <div className="text-[11px] text-success font-semibold truncate">Loaded: {blogForm.image_url}</div>}
                  </div>
                )}
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-on-surface-variant">Post Short Excerpt</label>
                <input type="text" required value={blogForm.excerpt} onChange={(e)=>setBlogForm({...blogForm, excerpt:e.target.value})} className="w-full bg-surface-container border border-outline-variant/20 rounded-xl px-3 py-2 text-sm focus:outline-none" placeholder="A short 1-sentence summary..." />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-on-surface-variant">HTML Post Content</label>
                <textarea rows={6} required value={blogForm.content} onChange={(e)=>setBlogForm({...blogForm, content:e.target.value})} className="w-full bg-surface-container border border-outline-variant/20 rounded-xl px-3 py-2 text-sm focus:outline-none font-mono leading-relaxed" placeholder="<p>Write your detailed article body here using HTML tags like p, h2, h3, etc...</p>" />
              </div>

              <div className="flex gap-4 pt-4 border-t">
                <button type="button" onClick={()=>setShowModal(null)} className="flex-1 bg-surface hover:bg-surface-container border py-2.5 rounded-xl font-bold text-sm cursor-pointer">Cancel</button>
                <button type="submit" disabled={actionSubmitting || uploading} className="flex-1 bg-primary text-white py-2.5 rounded-xl font-bold text-sm cursor-pointer">{actionSubmitting ? "Publishing..." : "Publish Post"}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
