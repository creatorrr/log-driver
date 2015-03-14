// Utils
export const
  {assign} = Object,
  isNode = () => !!( typeof module !== 'undefined' && module.exports ),
  isBrowser = () => !!( !isNode() && typeof window !== 'undefined' ),

  sessionStorage = typeof window !== 'undefined' && window.sessionStorage,
  store = sessionStorage && {
    get: key => sessionStorage.getItem(key),
    set: (key, value) => sessionStorage.setItem(key, value) || value
  };

