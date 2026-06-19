const SUPABASE_URL =
  "https://vnpxxetojolmgtzrqeuy.supabase.co/functions/v1";

async function bookWithReferral() {

  const referralEmail =
    document.getElementById(
      "referral-email"
    ).value.trim();

  const newPersonEmail =
    document.getElementById(
      "new-person-email"
    ).value.trim();

  const emailPattern =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (
    !emailPattern.test(referralEmail)
  ) {

    alert(
      "Please enter a valid referral email address."
    );

    return;
  }

  if (
    !emailPattern.test(newPersonEmail)
  ) {

    alert(
      "Please enter a valid new person email address."
    );

    return;
  }

  const response =
    await fetch(
      `${SUPABASE_URL}/referral-booking`,
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json"
        },
        body:
          JSON.stringify({
            referralEmail,
            newPersonEmail
          })
      }
    );

  const data =
    await response.json();

  if (!response.ok) {

    alert(
      data.error ||
      "Referral booking failed."
    );

    return;
  }

  alert(
    "Referral booking successful."
  );
}
