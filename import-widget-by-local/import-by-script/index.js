import VerifimeWidget from "../lib/verifime-widget.esm.min.js";

const KEY_PREFIX = "Verifime-widget-";
const KEY_EMAIL = KEY_PREFIX + "email";
const KEY_ORGANIATION_CODE = KEY_PREFIX + "organisation-code";
const KEY_REFERENCE_DATA = KEY_PREFIX + "reference-data";

function getStoreKey(email, code, referenceData) {
  const key = email + code + JSON.stringify(referenceData || {});
  const keyHash = CryptoJS.MD5(key).toString();
  return KEY_PREFIX + keyHash;
}

function store(key, value) {
  localStorage.setItem(key, value);
}

function getFromStore(key) {
  return localStorage.getItem(key) || "";
}

async function getTrackingReference(email, code, referenceData) {
  const storeKey = getStoreKey(email, code, referenceData);
  const storedTrackingReference = getFromStore(storeKey);
  if (storedTrackingReference) {
    return storedTrackingReference;
  }

  try {
    const res = await fetch(
      "https://person-api.main.verifime.com/v1/user/invite",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          code,
          referenceData: referenceData ? referenceData : undefined,
        }),
      }
    );
    const inviteResponse = await res.json();
    const trackingReference = inviteResponse.trackingReference;
    if (trackingReference) {
      store(storeKey, trackingReference);
    }
    return trackingReference;
  } catch {
    return null;
  }
}

function getInputs() {
  const emailEle = document.querySelector("#email");
  const organiationCodeEle = document.querySelector("#organiationCode");
  const referenceDataEle = document.querySelector("#referenceData");

  const email = emailEle.value;
  const organiationCode = organiationCodeEle.value;
  const referenceData = referenceDataEle.value;

  if (!email) {
    emailEle.focus();
    return;
  }

  if (!organiationCode) {
    organiationCodeEle.focus();
    return;
  }

  store(KEY_EMAIL, email);
  store(KEY_ORGANIATION_CODE, organiationCode);
  store(KEY_REFERENCE_DATA, referenceData);

  return { email, organiationCode, referenceData };
}

function fillInputs() {
  const email = getFromStore(KEY_EMAIL);
  const organiationCode = getFromStore(KEY_ORGANIATION_CODE);
  const referenceData = getFromStore(KEY_REFERENCE_DATA);

  const emailEle = document.querySelector("#email");
  const organiationCodeEle = document.querySelector("#organiationCode");
  const referenceDataEle = document.querySelector("#referenceData");

  emailEle.value = email;
  organiationCodeEle.value = organiationCode;
  referenceDataEle.value = referenceData;
}

async function renderWidget() {
  const { email, organiationCode, referenceData } = getInputs();

  const trackingReference = await getTrackingReference(
    email,
    organiationCode,
    referenceData
  );

  if (!trackingReference) {
    alert("Something went wrong, please check your inputs.");
    return;
  }

  const widgetInputs = document.querySelector("#widget-inputs");
  widgetInputs.remove();

  VerifimeWidget("#wrapper", trackingReference, {
    onError: () => {
      console.log("Something went wrong");
    },
    onSuccess: () => {
      console.log("Congratulations, you made it");
    },
  });
}

fillInputs();

export { renderWidget}