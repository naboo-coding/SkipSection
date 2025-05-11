const FilterSection = ({ children }) => (
  <div style={{
    position: 'relative',
    zIndex: 1000,
    marginBottom: '20px',
    display: 'flex',
    justifyContent: 'center'
  }}>
    {children}
  </div>
);

export default FilterSection; 