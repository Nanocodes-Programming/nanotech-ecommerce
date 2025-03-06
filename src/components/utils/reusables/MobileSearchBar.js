import AutoSearch from '../../AutoSearch';

// const styles = {
//   search:
//     'absolute -bottom-2 right-5 bg-white flex md:hidden justify-between items-center border rounded-lg border-amber-400 p-2 h-9 w-[87vw]  transition ease-in-out delay-1000',
//   searchInput: 'flex-1 border-none outline-none',
// };

const MobileSearchBar = () => {
  return (
    <div className="flex justify-center md:hidden transition ease-in-out delay-1000 w-[89vw]">
      {/* <input placeholder="Search" className={styles.searchInput} />
      <SearchIcon height={15} width={20} /> */}

      <AutoSearch />
    </div>
  );
};

export default MobileSearchBar;
