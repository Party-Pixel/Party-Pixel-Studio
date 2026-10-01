"use strict";

/* =====================================
   PARTY PIXEL STUDIO
   MAIN JAVASCRIPT
===================================== */

const INSTAGRAM_USERNAME = "party_pixelstudio";
const INSTAGRAM_PROFILE = "https://www.instagram.com/party_pixelstudio/";
const INSTAGRAM_DM = "https://ig.me/m/party_pixelstudio/";

/* =====================================
   HELPERS
===================================== */

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

function imagePath(filename) {
  if (!filename) return "";

  if (
    filename.startsWith("http://") ||
    filename.startsWith("https://") ||
    filename.startsWith("/") ||
    filename.startsWith("image/")
  ) {
    return filename;
  }

  return `image/${filename}`;
}

/* =====================================
   MOBILE NAV
===================================== */

const menuToggle = $("#menuToggle");
const navMenu = $("#navMenu");

if (menuToggle && navMenu) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("active");

    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("active");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

/* =====================================
   IMAGE PREVIEW
===================================== */

const imageOverlay = $("#imageOverlay");

if (imageOverlay) {
  const overlayImage = imageOverlay.querySelector("img");
  const overlayText = imageOverlay.querySelector("p");
  const closeButton = imageOverlay.querySelector(".image-overlay-close");

  function openImage(filename, title) {
    if (!overlayImage) return;

    overlayImage.src = imagePath(filename);
    overlayImage.alt = title || "Party Pixel invitation";

    if (overlayText) {
      overlayText.textContent = title || "";
    }

    imageOverlay.classList.remove("hidden");
    imageOverlay.setAttribute("aria-hidden", "false");

    document.body.classList.add("no-scroll");
  }

  function closeImage() {
    imageOverlay.classList.add("hidden");
    imageOverlay.setAttribute("aria-hidden", "true");

    document.body.classList.remove("no-scroll");
  }

  $$(".design-image").forEach((button) => {
    button.addEventListener("click", () => {
      openImage(button.dataset.image, button.dataset.title);
    });
  });

  if (closeButton) {
    closeButton.addEventListener("click", closeImage);
  }

  imageOverlay.addEventListener("click", (event) => {
    if (event.target === imageOverlay) {
      closeImage();
    }
  });

  window.closeImage = closeImage;
}

/* =====================================
   ENVELOPE
===================================== */

const envelopeDemo = $("#envelopeDemo");
const openEnvelope = $("#openEnvelope");
const openEnvelopeVisual = $("#openEnvelopeVisual");
const resetEnvelope = $("#resetEnvelope");

function openTheEnvelope() {
  if (!envelopeDemo) return;

  envelopeDemo.classList.add("opened");

  if (openEnvelope) {
    openEnvelope.classList.add("hidden");
  }

  if (resetEnvelope) {
    resetEnvelope.classList.remove("hidden");
  }
}

function resetTheEnvelope() {
  if (!envelopeDemo) return;

  envelopeDemo.classList.remove("opened");

  if (openEnvelope) {
    openEnvelope.classList.remove("hidden");
  }

  if (resetEnvelope) {
    resetEnvelope.classList.add("hidden");
  }
}

if (openEnvelope) {
  openEnvelope.addEventListener("click", openTheEnvelope);
}

if (openEnvelopeVisual) {
  openEnvelopeVisual.addEventListener("click", openTheEnvelope);
}

if (resetEnvelope) {
  resetEnvelope.addEventListener("click", resetTheEnvelope);
}

/* =====================================
   PRICING
===================================== */

const packageOptions = $$('input[name="package"]');

const extraRevision = $("#extraRevision");
const rushOrder = $("#rushOrder");
const orderTotal = $("#orderTotal");

function getSelectedPackagePrice() {
  const selected = document.querySelector('input[name="package"]:checked');

  if (!selected) return 10;

  return Number(selected.dataset.price) || 10;
}

function updateTotal() {
  let total = getSelectedPackagePrice();

  if (extraRevision?.checked) {
    total += 3;
  }

  if (rushOrder?.checked) {
    total += 7;
  }

  if (orderTotal) {
    orderTotal.textContent = `$${total}`;
  }
}

packageOptions.forEach((option) => {
  option.addEventListener("change", updateTotal);
});

extraRevision?.addEventListener("change", updateTotal);
rushOrder?.addEventListener("change", updateTotal);

/* =====================================
   PRICE CARD BUTTONS
===================================== */

$$(".price-button").forEach((button) => {
  button.addEventListener("click", () => {
    const packageName = button.dataset.package;

    const matchingPackage = [...packageOptions].find((option) =>
      option.value.startsWith(packageName),
    );

    if (matchingPackage) {
      matchingPackage.checked = true;
      updateTotal();
    }

    const orderSection = $("#order");

    if (orderSection) {
      orderSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

/* =====================================
   SURPRISE ME
===================================== */

const surpriseButton = $("#surpriseMe");
const surpriseResult = $("#surpriseResult");

const surpriseIdeas = [
  {
    event: "Birthday",
    theme: "Spooky Halloween Birthday",
    colors: "Black, orange, purple",
    request:
      "Use pumpkins, bats, spider webs, spooky lighting and a modern Halloween party style.",
  },
  {
    event: "Birthday",
    theme: "Basketball Game Night",
    colors: "Orange, black, white",
    request:
      "Make it feel like a real basketball game poster with court-inspired graphics and bold typography.",
  },
  {
    event: "Gaming Party",
    theme: "Neon Arcade",
    colors: "Electric blue, purple, pink",
    request:
      "Use glowing arcade graphics, neon lights and pixel-inspired details.",
  },
  {
    event: "Birthday",
    theme: "Midnight Party",
    colors: "Black, navy, silver",
    request:
      "Create a dark nighttime look with stars, glow effects and a premium atmosphere.",
  },
  {
    event: "Birthday",
    theme: "Retro 2000s",
    colors: "Pink, blue, silver",
    request:
      "Use a fun early-2000s style with shiny details, playful text and retro graphics.",
  },
  {
    event: "Halloween",
    theme: "Haunted House",
    colors: "Black, orange, dark purple",
    request:
      "Build a spooky haunted-house atmosphere with fog, pumpkins, bats and spider webs.",
  },
  {
    event: "Wedding",
    theme: "Luxury Celebration",
    colors: "Black, gold, cream",
    request:
      "Make the invitation elegant and clean with subtle luxury details.",
  },
  {
    event: "Birthday",
    theme: "Movie Premiere",
    colors: "Black, red, gold",
    request:
      "Design it like a movie premiere poster with dramatic typography and cinematic details.",
  },
  {
    event: "Baby Shower",
    theme: "Cloud Nine",
    colors: "White, baby blue, lavender",
    request: "Use soft clouds, dreamy lighting and a clean floating feeling.",
  },
];

if (surpriseButton) {
  surpriseButton.addEventListener("click", () => {
    const idea =
      surpriseIdeas[Math.floor(Math.random() * surpriseIdeas.length)];

    const eventType = $("#eventType");
    const theme = $("#theme");
    const colors = $("#colors");
    const extraRequests = $("#extraRequests");

    if (eventType) {
      eventType.value = idea.event;
    }

    if (theme) {
      theme.value = idea.theme;
    }

    if (colors) {
      colors.value = idea.colors;
    }

    if (extraRequests) {
      extraRequests.value = idea.request;
    }

    if (surpriseResult) {
      surpriseResult.innerHTML = `
        <strong>✦ Your surprise theme: ${idea.theme}</strong>
        <br>
        Event: ${idea.event}
        <br>
        Colors: ${idea.colors}
        <br>
        Idea: ${idea.request}
      `;

      surpriseResult.classList.add("show");
    }

    const formSection = surpriseButton.closest(".form-section");

    if (formSection) {
      formSection.classList.add("surprise-active");

      setTimeout(() => {
        formSection.classList.remove("surprise-active");
      }, 1000);
    }
  });
}

/* =====================================
   CLIPBOARD
===================================== */

async function copyText(text) {
  if (!text) return false;

  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch (error) {
    console.log("Clipboard API failed.", error);
  }

  const temporary = document.createElement("textarea");

  temporary.value = text;
  temporary.style.position = "fixed";
  temporary.style.left = "-9999px";
  temporary.style.top = "0";

  document.body.appendChild(temporary);

  temporary.focus();
  temporary.select();

  let success = false;

  try {
    success = document.execCommand("copy");
  } catch (error) {
    success = false;
  }

  temporary.remove();

  return success;
}

/* =====================================
   ACTION MODAL
===================================== */

const actionModal = $("#actionModal");
const closeModalButton = $("#closeModal");
const copyModalMessage = $("#copyModalMessage");
const openInstagram = $("#openInstagram");
const modalMessage = $("#modalMessage");
const modalTitle = $("#modalTitle");
const modalText = $("#modalText");

let currentMessage = "";

function openActionModal(message, title = "You're ready!") {
  if (!actionModal) return;

  currentMessage = message;

  if (modalMessage) {
    modalMessage.value = message;
  }

  if (modalTitle) {
    modalTitle.textContent = title;
  }

  if (modalText) {
    modalText.textContent =
      "Your message is ready. Instagram will open so you can paste it into your DM to @party_pixelstudio.";
  }

  actionModal.classList.add("show");
  actionModal.setAttribute("aria-hidden", "false");

  document.body.classList.add("no-scroll");
}

function closeActionModal() {
  if (!actionModal) return;

  actionModal.classList.remove("show");
  actionModal.setAttribute("aria-hidden", "true");

  document.body.classList.remove("no-scroll");
}

closeModalButton?.addEventListener("click", closeActionModal);

if (actionModal) {
  const backdrop = actionModal.querySelector(".modal-backdrop");

  backdrop?.addEventListener("click", closeActionModal);
}

copyModalMessage?.addEventListener("click", async () => {
  const success = await copyText(currentMessage);

  copyModalMessage.textContent = success ? "Copied ✓" : "Copy failed";

  setTimeout(() => {
    copyModalMessage.textContent = "Copy Again";
  }, 1600);
});

openInstagram?.addEventListener("click", () => {
  window.open(INSTAGRAM_DM, "_blank", "noopener,noreferrer");
});

/* =====================================
   ORDER FORM
===================================== */

const customDesignForm = $("#customDesignForm");

if (customDesignForm) {
  customDesignForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const customerName = $("#customerName")?.value.trim() || "";

    const customerInstagram = $("#customerInstagram")?.value.trim() || "";

    const customerEmail = $("#customerEmail")?.value.trim() || "";

    const eventType = $("#eventType")?.value || "";

    const selectedPackage = document.querySelector(
      'input[name="package"]:checked',
    );

    const packageName = selectedPackage
      ? selectedPackage.value
      : "Basic Digital - $10";

    const revision = extraRevision?.checked ? "Yes (+$3)" : "No";

    const rush = rushOrder?.checked ? "Yes (+$7)" : "No";

    const theme = $("#theme")?.value.trim() || "No specific theme";

    const colors = $("#colors")?.value.trim() || "Open to suggestions";

    const eventDetails = $("#eventDetails")?.value.trim() || "";

    const extraRequests = $("#extraRequests")?.value.trim() || "None";

    const total = orderTotal?.textContent || "$10";

    currentMessage = `🎃 PARTY PIXEL STUDIO ORDER

Name: ${customerName}
Instagram: ${customerInstagram}
Email: ${customerEmail}

Event: ${eventType}
Package: ${packageName}
Extra revision: ${revision}
Rush order: ${rush}

Theme: ${theme}
Colors: ${colors}

Event details:
${eventDetails}

Extra requests:
${extraRequests}

Estimated total: ${total}

Sent from Party Pixel Studio website.`;

    const copied = await copyText(currentMessage);

    openActionModal(
      currentMessage,
      copied ? "Your order is ready!" : "Your order is ready to copy!",
    );
  });
}

/* =====================================
   SUBSCRIPTION
===================================== */

const subscribeForm = $("#subscribeForm");

if (subscribeForm) {
  subscribeForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const subscriberEmail = $("#subscriberEmail");

    const email = subscriberEmail?.value.trim() || "";

    if (!email) return;

    const subscriptionMessage = `📬 PARTY PIXEL STUDIO UPDATES

I would like to join the Party Pixel Studio updates list.

Email: ${email}

Please send me updates about new invitation designs, offers and announcements.`;

    const copied = await copyText(subscriptionMessage);

    openActionModal(
      subscriptionMessage,
      copied ? "Updates request ready!" : "Updates request ready to copy!",
    );

    if (subscriberEmail) {
      subscriberEmail.value = "";
    }
  });
}

/* =====================================
   FAQ
===================================== */

$$(".faq-question").forEach((question) => {
  question.addEventListener("click", () => {
    const item = question.closest(".faq-item");

    if (!item) return;

    const isOpen = item.classList.toggle("open");

    question.setAttribute("aria-expanded", String(isOpen));
  });
});

/* =====================================
   CHATBOT
===================================== */

const chatButton = $("#chatButton");
const chatBox = $("#chatBox");
const closeChat = $("#closeChat");
const chatForm = $("#chatForm");
const chatInput = $("#chatInput");
const chatMessages = $("#chatMessages");

if (chatButton && chatBox) {
  chatButton.addEventListener("click", () => {
    const isOpen = chatBox.classList.toggle("show");

    chatBox.setAttribute("aria-hidden", String(!isOpen));

    if (isOpen && chatInput) {
      setTimeout(() => {
        chatInput.focus();
      }, 100);
    }
  });
}

if (closeChat && chatBox) {
  closeChat.addEventListener("click", () => {
    chatBox.classList.remove("show");
    chatBox.setAttribute("aria-hidden", "true");
  });
}

function addChatMessage(text, user = false) {
  if (!chatMessages) return;

  const message = document.createElement("div");

  message.className = user ? "user-message" : "bot-message";

  message.textContent = text;

  chatMessages.appendChild(message);

  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function getChatAnswer(question) {
  const q = question.toLowerCase();

  if (q.includes("price") || q.includes("cost") || q.includes("how much")) {
    return "Basic is $10, Interactive is $15, and Premium Custom is $20. Extra revision is +$3 and rush order is +$7.";
  }

  if (q.includes("order") || q.includes("buy")) {
    return "Go to the Order section, fill out your details, and the website will prepare and copy a message for your Instagram DM to @party_pixelstudio.";
  }

  if (q.includes("rsvp")) {
    return "Interactive and Premium can include RSVP features for your guests.";
  }

  if (q.includes("revision") || q.includes("change")) {
    return "Basic includes 1 revision, Interactive includes up to 3, and Premium includes up to 5. Extra revisions are +$3 each.";
  }

  if (q.includes("rush")) {
    return "Rush orders are available for an additional $7.";
  }

  if (q.includes("instagram") || q.includes("ig")) {
    return "You can find Party Pixel Studio on Instagram at @party_pixelstudio.";
  }

  if (q.includes("email")) {
    return "Our business email is partypixelstudio1@gmail.com.";
  }

  if (q.includes("subscribe") || q.includes("updates")) {
    return "Use the Updates section to prepare a subscription request for @party_pixelstudio.";
  }

  if (q.includes("hello") || q.includes("hey") || q.includes("hi")) {
    return "Hey! I can help with prices, orders, RSVP, revisions, rush orders, subscriptions and Instagram.";
  }

  return "I can help with prices, orders, RSVP, revisions, rush orders, subscriptions or Instagram. Try asking about one of those!";
}

chatForm?.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!chatInput) return;

  const question = chatInput.value.trim();

  if (!question) return;

  addChatMessage(question, true);

  chatInput.value = "";

  setTimeout(() => {
    addChatMessage(getChatAnswer(question));
  }, 250);
});

/* =====================================
   ESCAPE KEY
===================================== */

document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return;

  if (window.closeImage) {
    window.closeImage();
  }

  closeActionModal();

  if (chatBox) {
    chatBox.classList.remove("show");

    chatBox.setAttribute("aria-hidden", "true");
  }
});

/* =====================================
   FOOTER YEAR
===================================== */

const year = $("#year");

if (year) {
  year.textContent = new Date().getFullYear();
}

/* =====================================
   INITIAL TOTAL
===================================== */

updateTotal();
