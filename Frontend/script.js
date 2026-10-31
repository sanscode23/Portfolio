/* ==========================================================================
   SANSKAR WANKHEDE | FULL STACK DEVELOPER PORTFOLIO JAVASCRIPT
   Features: Typing Effect, Mobile Menu Toggle, ScrollSpy Active Nav,
             Sticky Navbar, Animated Skill Bars, Toast Feedback
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  // 0. Simple & Elegant Smiley + Quote Intro Dismissal
  const introOverlay = document.getElementById("introOverlay");
  const skipIntroBtn = document.getElementById("skipIntroBtn");

  function dismissIntro() {
    if (!introOverlay || introOverlay.classList.contains("fade-out")) return;
    introOverlay.classList.add("fade-out");
    setTimeout(() => {
      introOverlay.style.display = "none";
    }, 1200);
  }

  if (introOverlay) {
    // Automatically fades out after 4.2 seconds of displaying the quote
    const autoDismissTimer = setTimeout(() => {
      dismissIntro();
    }, 4200);

    // Skip button for immediate entry
    if (skipIntroBtn) {
      skipIntroBtn.addEventListener("click", () => {
        clearTimeout(autoDismissTimer);
        dismissIntro();
      });
    }
  }

  // 1. Mobile Menu Toggle
  const menuToggle = document.getElementById("menuToggle");
  const navbar = document.getElementById("navbar");
  const navLinks = navbar.querySelectorAll("a");
  const menuIcon = menuToggle.querySelector("i");

  menuToggle.addEventListener("click", () => {
    navbar.classList.toggle("active");
    if (navbar.classList.contains("active")) {
      menuIcon.classList.remove("fa-bars");
      menuIcon.classList.add("fa-xmark");
    } else {
      menuIcon.classList.remove("fa-xmark");
      menuIcon.classList.add("fa-bars");
    }
  });

  // Close mobile menu when clicking a link
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navbar.classList.remove("active");
      menuIcon.classList.remove("fa-xmark");
      menuIcon.classList.add("fa-bars");
    });
  });

  // Close mobile menu when clicking outside
  document.addEventListener("click", (e) => {
    if (!navbar.contains(e.target) && !menuToggle.contains(e.target) && navbar.classList.contains("active")) {
      navbar.classList.remove("active");
      menuIcon.classList.remove("fa-xmark");
      menuIcon.classList.add("fa-bars");
    }
  });

  // 2. Sticky Navbar & ScrollSpy Active Link Tracking
  const header = document.querySelector(".header");
  const sections = document.querySelectorAll("section");

  function onScroll() {
    const scrollY = window.pageYOffset;

    // Header sticky styling
    if (scrollY > 60) {
      header.classList.add("sticky");
    } else {
      header.classList.remove("sticky");
    }

    // ScrollSpy active link detection
    sections.forEach((current) => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 140;
      const sectionId = current.getAttribute("id");

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${sectionId}`) {
            link.classList.add("active");
          }
        });
      }
    });
  }

  window.addEventListener("scroll", onScroll);
  onScroll(); // Run once on load

  // 3. Typing Effect (Only "Full Stack Developer")
  const typingEl = document.querySelector(".typing-text");
  const targetText = "Full Stack Developer";
  let charIndex = 0;
  let isDeleting = false;
  const typingSpeed = 110;
  const deletingSpeed = 60;
  const pauseEnd = 3200; // Pause longer when completed
  const pauseStart = 600;

  function typeRole() {
    if (!typingEl) return;

    if (!isDeleting) {
      charIndex++;
      typingEl.textContent = targetText.substring(0, charIndex);

      if (charIndex === targetText.length) {
        isDeleting = true;
        setTimeout(typeRole, pauseEnd);
        return;
      }
      setTimeout(typeRole, typingSpeed);
    } else {
      charIndex--;
      typingEl.textContent = targetText.substring(0, charIndex);

      if (charIndex === 0) {
        isDeleting = false;
        setTimeout(typeRole, pauseStart);
        return;
      }
      setTimeout(typeRole, deletingSpeed);
    }
  }

  if (typingEl) {
    typeRole();
  }

  // 4. Animate Skills & Project Usage Percentage Bars on Viewport Enter
  const skillSection = document.getElementById("skills");
  const usageCards = document.querySelectorAll(".usage-card");

  if (skillSection) {
    const skillsObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            usageCards.forEach((card) => card.classList.add("active"));
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    skillsObserver.observe(skillSection);
  }

  // 5. Contact Form Submission with Cloudinary File Upload & Formspree Delivery
  const contactForm = document.getElementById("contactForm");
  const fileInput = document.getElementById("fileAttachment");
  const fileUploadLabel = document.getElementById("fileUploadLabel");
  const fileLabelText = document.getElementById("fileLabelText");
  const removeFileBtn = document.getElementById("removeFileBtn");
  const cloudinaryUrlInput = document.getElementById("cloudinaryFileUrl");
  const toast = document.getElementById("toast");
  const toastMessage = document.getElementById("toastMessage");
  let toastTimer;

  // Cloudinary credentials
  const CLOUDINARY_CLOUD_NAME = "ytstfw4f";
  const CLOUDINARY_UPLOAD_PRESET = "Portfolio";

  function showToast(message) {
    if (!toast) return;
    toastMessage.textContent = message;
    toast.classList.add("show");

    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove("show");
    }, 4500);
  }

  // Handle file selection UI
  if (fileInput) {
    fileInput.addEventListener("change", () => {
      if (fileInput.files && fileInput.files.length > 0) {
        const file = fileInput.files[0];
        // 10MB limit check
        if (file.size > 10 * 1024 * 1024) {
          showToast("File is too large. Max size is 10MB.");
          resetFileInput();
          return;
        }
        fileLabelText.textContent = `${file.name} (${(file.size / 1024 / 1024).toFixed(2)} MB)`;
        fileUploadLabel.classList.add("has-file");
        if (removeFileBtn) removeFileBtn.style.display = "flex";
      } else {
        resetFileInput();
      }
    });
  }

  function resetFileInput() {
    if (fileInput) fileInput.value = "";
    if (fileLabelText) fileLabelText.textContent = "Attach Image or PDF (Optional, max 10MB)";
    if (fileUploadLabel) fileUploadLabel.classList.remove("has-file");
    if (removeFileBtn) removeFileBtn.style.display = "none";
    if (cloudinaryUrlInput) cloudinaryUrlInput.value = "";
  }

  if (removeFileBtn) {
    removeFileBtn.addEventListener("click", () => {
      resetFileInput();
    });
  }

  // Helper to upload a file directly to Cloudinary
  async function uploadToCloudinary(file) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

    const isPdf = file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf");

    // Images → /image/upload (publicly accessible)
    // PDFs   → /raw/upload   (needs raw delivery enabled in Cloudinary Security settings)
    const resourceType = isPdf ? "raw" : "image";

    const response = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/${resourceType}/upload`, {
      method: "POST",
      body: formData
    });

    if (!response.ok) {
      const errData = await response.json().catch(() => null);
      const errMsg = errData && errData.error ? errData.error.message : "Upload failed";
      throw new Error(errMsg);
    }

    const data = await response.json();
    return data.secure_url;
  }

  if (contactForm) {
    contactForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const subject = document.getElementById("subject").value.trim();
      const message = document.getElementById("message").value.trim();

      if (!name || !email || !message) {
        showToast("Please fill in all required fields.");
        return;
      }

      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.disabled = true;

      try {
        let uploadedUrl = "";
        const file = fileInput && fileInput.files && fileInput.files[0];

        // Step 1: If a file is selected, upload to Cloudinary first
        if (file) {
          submitBtn.textContent = "Uploading file...";
          try {
            uploadedUrl = await uploadToCloudinary(file);
            if (cloudinaryUrlInput) cloudinaryUrlInput.value = uploadedUrl;
          } catch (uploadErr) {
            console.error("Cloudinary error:", uploadErr);
            showToast("Failed to upload attachment. Please try again.");
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            return;
          }
        }

        // Step 2: Send form data (with Cloudinary link) to Formspree
        submitBtn.textContent = "Sending message...";

        const formData = new FormData(contactForm);

        // If a file was uploaded, also append the link directly in the message text for easy access
        if (uploadedUrl) {
          const currentMsg = formData.get("message") || "";
          formData.set("message", `${currentMsg}\n\n📎 Attached File: ${uploadedUrl}`);
        }

        const response = await fetch("https://formspree.io/f/xjyyeozz", {
          method: "POST",
          body: formData,
          headers: {
            "Accept": "application/json"
          }
        });

        if (response.ok) {
          contactForm.reset();
          resetFileInput();
          showToast(`Thank you, ${name}! Your message & attachment were sent successfully.`);
        } else {
          const data = await response.json().catch(() => null);
          if (data && data.errors && data.errors.length > 0) {
            showToast(data.errors.map(err => err.message).join(", "));
          } else {
            showToast("Oops! There was a problem submitting your form.");
          }
        }
      } catch (error) {
        showToast("Network error. Please try again or email directly.");
      } finally {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      }
    });
  }
});
