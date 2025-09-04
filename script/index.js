const craeateElements = (arr) => {
  const htmlElements = arr.map((el) => `<span class = "btn">${el}</span>`);
  return htmlElements.join(" ");
};

const loadAllLessons = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/levels/all"
  );
  const datas = await res.json();
  displayLesson(datas.data);
};

const removeActive = () => {
  const individualLesson = document.querySelectorAll(".single-lesson");
  individualLesson.forEach((btn) => {
    btn.classList.remove("active");
  });
};

const loadLevelWord = (id) => {
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      removeActive(); //remove all the active class
      const lsnBtn = document.getElementById(`lesson-btn-${id}`);
      lsnBtn.classList.add("active"); //active lesson button
      displayLevelWord(data.data);
    });
};

const loadWordDetail = async (id) => {
  const url = `https://openapi.programming-hero.com/api/word/${id}`;
  const res = await fetch(url);
  const details = await res.json();
  displayWordDetails(details.data);
};

const displayWordDetails = (word) => {
  //   console.log(word);

  const detailsBox = document.getElementById("details-container");
  detailsBox.innerHTML = `
    
    <div class="pb-5">
            <h2 class="text-2xl font-bold">
              ${word.word} ( <i class="fa-solid fa-microphone-lines"></i> :${
    word.pronunciation
  })
            </h2>
          </div>
          <div>
            <h2 class="font-bold">Meaning</h2>
            <p>${word.meaning}</p>
          </div>
          <div>
            <h2 class="font-bold">Example</h2>
            <p>${word.sentence}</p>
          </div>
          <div>
            <h2 class="font-bold pb-2">সমার্থক শব্দ গুলো</h2>
            <div class="">${craeateElements(word.synonyms)}</div>
          </div>
        </div>
        <div class="modal-action">
          <form method="dialog">
            <!-- if there is a button in form, it will close the modal -->
            <button class="btn btn-primary">Complete Learing</button>
          </form>
        </div>
    
    `;
  document.getElementById("word_modal").showModal();
};

const displayLevelWord = (words) => {
  const getLevelWordShowId = document.getElementById("showLevelWord");
  getLevelWordShowId.innerHTML = "";

  if (words.length == 0) {
    getLevelWordShowId.innerHTML = `
    <div class="col-span-full py-16 space-y-6 text-center font-bangla">
          <img src="./assets/alert-error.png" class="w-20 mx-auto" alt="" />
          <p class="text-gray-400">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি</p>
          <h2 class="text-4xl font-semibold">নেক্সট Lesson এ যান</h2>
    </div>
    `;
    return;
  }

  for (const word of words) {
    const createElement = document.createElement("div");
    createElement.innerHTML = `
    
    <div
          class="min-h-96 p-4 flex flex-col justify-center bg-white rounded-lg"
    >
        <div>
            <div class="text-center">
              <h3 class="font-bold text-3xl pb-3">${word.word}</h3>
              <p class="font-medium text-[20px] pb-3">
                Meaning / Pronounciation
              </p>
              <h3 class="font-bold font-bangla text-3xl">${
                word.meaning ? word.meaning : "অর্থ পাওয়া যায় নি"
              } / ${
      word.pronunciation ? word.pronunciation : "pronunciation পাওয়া যায় নি"
    }</h3>
            </div>
            <div class="flex justify-between"> 
              <button onclick="loadWordDetail(${
                word.id
              })"  class = "btn bg-[#1a91ff1a] hover:bg-[#1a90ff7c]"><i class="fa-solid fa-circle-info fa-xl text-[#374957]"></i></button>
              <button class = "btn bg-[#1a91ff1a] hover:bg-[#1a90ff7c]""><i class="fa-solid fa-volume-high fa-xl text-[#374957]"></i></button>
            </div>
        </div>
    </div>
    
    `;
    getLevelWordShowId.appendChild(createElement);
  }
};

const displayLesson = (lessons) => {
  const lavelContainer = document.getElementById("lavel-container");
  lavelContainer.innerHTML = "";
  for (lesson of lessons) {
    const createDiv = document.createElement("div");
    createDiv.innerHTML = `
    <button onclick="loadLevelWord(${lesson.level_no})" id = "lesson-btn-${lesson.level_no}" class="single-lesson btn btn-outline border-2 btn-primary">
        <i class="fa-solid fa-book-open"></i> Lesson - ${lesson.level_no}
    </button>
    `;
    lavelContainer.appendChild(createDiv);
    // console.log(lesson.level_no);
  }
};

loadAllLessons();
