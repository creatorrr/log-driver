// Utils
export const
  {assign} = Object,
  isNode = () => !!( typeof module !== 'undefined' && module.exports ),
  isBrowser = () => !!( !isNode() && typeof window !== 'undefined' ),

  localStorage = typeof window !== 'undefined' && window.localStorage,
  store = localStorage && {
    enabled: !!localStorage,
    get: key => JSON.parse(localStorage.getItem(key)),
    set: (key, value) => localStorage.setItem(key, JSON.stringify(value)) || value
  };

