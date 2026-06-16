const SUPABASE_URL =
  "https://vnpxxetojolmgtzrqeuy.supabase.co/functions/v1";

document.addEventListener(
  "DOMContentLoaded",
  async () => {

    await loadCourse();
    await loadNextSession();
    await loadLessonSchedule();
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
