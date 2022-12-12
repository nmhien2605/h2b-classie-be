export const URL_EXPIRE_TIME = 7 * 24 * 60 * 60 * 100; // a week
export const SLIDE_TYPE = {
  MUL_CHOICES: 1,
};

export const FIRST_SLIDE = {
  name: "Your first slide",
  slides: [
    {
      detail: {
        title: "Your question",
        type: SLIDE_TYPE.MUL_CHOICES,
        options: ["option 1", "option 2"],
        values: [0, 0],
      },
    },
  ],
  groups: [],
};
