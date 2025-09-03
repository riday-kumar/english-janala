const loadAllLessons = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/levels/all"
  );
  const datas = await res.json();
  displayLesson(datas.data);
};

const loadLevelWord = (id) => {
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayLevelWord(data.data));
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
              <button class = "btn bg-[#1a91ff1a] hover:bg-[#1a90ff7c]"><i class="fa-solid fa-circle-info fa-xl text-[#374957]"></i></button>
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
    <button onclick="loadLevelWord(${lesson.level_no})" class="btn btn-outline border-2 btn-primary">
        <i class="fa-solid fa-book-open"></i> Lesson - ${lesson.level_no}
    </button>
    `;
    lavelContainer.appendChild(createDiv);
    // console.log(lesson.level_no);
  }
};

loadAllLessons();
