
export const Loading = () => {
   return (
      <div className='loading-map d-flex justify-content-center align-items-center'>
         <div className="d-flex flex-column align-items-center">
            <div className="spinner-border text-primary custom-loading-size" role="status">
               <span className="visually-hidden">Loading...</span>
            </div>
            <h6 className="mt-2 text-secondary">Please wait...</h6>
         </div>
      </div>
   );
};
