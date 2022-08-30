/**
 * It's a function that takes in a children prop and returns a div with some styling and the children
 * prop.
 * @returns The FiltersContainer component is being returned.
 */
const FiltersContainer = ({ children }) => {
  return (
    <div className="flex items-center justify-between p-4 bg-gray-700 border-b border-solid border-gray-600">
      {children}
    </div>
  );
};

/**
 * It takes a prop called total and returns a paragraph with the text "Items Left" and the value of
 * total.
 * @returns A function that returns a JSX element.
 */
const ItemsLeft = ({ total = 0 }) => {
  return <p className=" text-gray-400 text-sm">{total} Items Left</p>;
};

/**
 * It's a function that returns a div with a className of 'flex items-center space-x-2' and the
 * children that are passed to it.
 * @returns The FilterButtonContainer is returning a div with the className of flex items-center
 * space-x-2.
 */
const FilterButtonContainer = ({ children }) => {
  return <div className="flex items-center space-x-2">{children}</div>;
};

/* It's a function that takes in three props, action, active, and filter. It returns a button
with an onClick event that calls the action prop. The className is a string that is concatenated
with
a ternary operator. The ternary operator checks if the active prop includes the filter prop. If it
does, then the className is text-indigo-700, otherwise it's text-gray-400. The button has a child
element that is the filter prop. */
const FilterButton = ({ action, active, filter }) => {
  return (
    <button
      onClick={action}
      className={
        `hover:text-white cursor-pointer px-1 transition-all duration-300 ease-in-out` +
        (active.toLowerCase().includes(filter.toLowerCase())
          ? "text-indigo-700"
          : "text-gray-400")
      }
    >
      {filter}
    </button>
  );
};

export { ItemsLeft, FiltersContainer, FilterButtonContainer, FilterButton };
