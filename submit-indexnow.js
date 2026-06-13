const payload = {
  host: "sudaisjan.com",
  key: "0a57b50f3465434abc112f09f8f086ad",
  keyLocation: "https://sudaisjan.com/0a57b50f3465434abc112f09f8f086ad.txt",
  urlList: [
    "https://sudaisjan.com/",
    "https://sudaisjan.com/projects",
    "https://sudaisjan.com/resume",
    "https://sudaisjan.com/projects/ai-voice-ops",
    "https://sudaisjan.com/projects/autonomous-outreach-engine",
    "https://sudaisjan.com/projects/ai-detailer-platform",
    "https://sudaisjan.com/projects/ecom-shopping-assistant",
    "https://sudaisjan.com/projects/abandoned-cart-closer",
    "https://sudaisjan.com/projects/home-service-booker",
    "https://sudaisjan.com/projects/ecom-creative-agent",
    "https://sudaisjan.com/projects/airtable-ad-suite",
    "https://sudaisjan.com/projects/enterprise-content-engine"
  ]
};

async function submitIndexNow() {
  console.log("Submitting URLs to IndexNow (api.indexnow.org)...");
  try {
    const response = await fetch("https://api.indexnow.org/IndexNow", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify(payload)
    });

    console.log(`Response Status: ${response.status} ${response.statusText}`);
    
    if (response.ok) {
      console.log("Success! URLs successfully submitted to IndexNow search engines (Bing, Yandex, etc.).");
    } else {
      const text = await response.text();
      console.error(`IndexNow submission failed: ${text}`);
    }
  } catch (error) {
    console.error("Error submitting to IndexNow:", error);
  }
}

submitIndexNow();
