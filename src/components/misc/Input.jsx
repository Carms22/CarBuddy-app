
function Input({type="text", label, placeholder, name, id,value, error, onChange, onBlur}) {

  return ( 
    <div>
      <label htmlFor={id} className="form-label">
        {label}
      </label>

      <input className={`form-control ${error ? 'is-invalid' : ''}`} 
        name={name} id={id} 
        placeholder={placeholder} value={value}
        onChange={onChange} onBlur={onBlur}
      />
      {error && (
        <div className="invalid-feedback">
          {error}
        </div>
      ) }
    </div>
   );
}

export default Input;