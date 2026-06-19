const SUPABASE_URL =
  "https://vnpxxetojolmgtzrqeuy.supabase.co/functions/v1";

document.addEventListener(
  "DOMContentLoaded",
  async () => {

    await loadCourse();
    await loadNextSession();
    await loadLessonSchedule();

    document.getElementById(
      "paypal-button"
    ).addEventListener(
      "click",
      payWithPayPal
    );

    document.getElementById(
      "referral-button"
    ).addEventListener(
      "click",
      bookWithReferral
    );
  }
);

async function loadCourse() {

  try {

    const response =
      await fetch(
        `${SUPABASE_URL}/get-course`,
        {
          method: "POST"
        }
      );

    const course =
      await response.json();

    document.getElementById(
      "Course"
    ).textContent =
      course.Course || "";

    document.getElementById(
      "Structure"
    ).textContent =
      course.Structure || "";

    document.getElementById(
      "Terms"
    ).textContent =
      course.Terms || "";

  } catch (error) {

    console.error(
      "loadCourse error:",
      error
    );
  }
}

async function loadNextSession() {

  try {

    const response =
      await fetch(
        `${SUPABASE_URL}/get-next-session`,
        {
          method: "POST"
        }
      );

    const lesson =
      await response.json();

    document.getElementById(
      "Title"
    ).textContent =
      lesson.Title || "";

    document.getElementById(
      "Date"
    ).textContent =
      lesson.Date || "";

    document.getElementById(
      "Time"
    ).textContent =
      lesson.Time || "";

    document.getElementById(
      "Content"
    ).textContent =
      lesson.Content || "";

  } catch (error) {

    console.error(
      "loadNextSession error:",
      error
    );
  }
}

async function loadLessonSchedule() {

  try {

    const response =
      await fetch(
        `${SUPABASE_URL}/get-lesson-schedule`,
        {
          method: "POST"
        }
      );

    const lessons =
      await response.json();

    const container =
      document.getElementById(
        "LessonSchedule"
      );

    container.innerHTML = "";

    lessons.forEach(
      lesson => {

        const row =
          document.createElement(
            "div"
          );

        row.textContent =
          `${lesson.Date} ${lesson.Time} - ${lesson.Title}`;

        container.appendChild(
          row
        );
      }
    );

  } catch (error) {

    console.error(
      "loadLessonSchedule error:",
      error
    );
  }
}

async function payWithPayPal() {

  const email =
    document.getElementById(
      "booking-email"
    ).value.trim();

  const emailPattern =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (
    !emailPattern.test(email)
  ) {

    alert(
      "Please enter a valid email address."
    );

    return;
  }

  localStorage.setItem(
    "booking_email",
    email
  );

  const response =
    await fetch(
      `${SUPABASE_URL}/create-paypal-order`,
      {
        method: "POST"
      }
    );

  const data =
    await response.json();

  if (
    !response.ok
  ) {

    alert(
      data.error ||
      "PayPal error."
    );

    return;
  }

  localStorage.setItem(
    "paypal_order_id",
    data.order_id
  );

  window.location.href =
    data.approve_url;
}

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
