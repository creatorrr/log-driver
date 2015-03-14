// Utils
export const
  {assign} = Object,
  isNode = () => !!( module && module.exports && this.module !== module ),
  isBrowser = () => !!( !isNode() && window ),

  {sessionStorage} = window,
  store = sessionStorage && {
    get: key => sessionStorage.getItem(key),
    set: (key, value) => sessionStorage.setItem(key, value) || value
  };

