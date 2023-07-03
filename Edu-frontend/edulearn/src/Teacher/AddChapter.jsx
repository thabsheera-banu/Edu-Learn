import React from 'react'
import Sidebar from './Sidebar'

function AddChapter() {
    
  return (
    <div className='container mt-4 '>

        <div className='row '>

            <aside className=''>

            </aside>
            <section className='col-9'>
                <div className='card'>
                    <h5 className='card-header'>Add Cource</h5>
                    <div className='card-body'>
                        <form>
                            <div className='mb-3'>
                                <label for="title" className='form-label'>Title</label>
                                <input type="text" id="title" className='form-control'></input>

                            </div>

                            <div className='mb-3'>
                                <label for="description" className='form-label'>Description</label>
                                <textarea  id="description" className='form-control'></textarea>

                            </div>
                            <div className='mb-3'>
                                <label for="video" className='form-label'>Video</label>
                                <input type="file" id="video" className='form-control'></input>

                            </div>
                            <div className='mb-3'>
                                <label for="techs" className='form-label'>Remarks</label>
                                <textarea  id="techs" className='form-control' placeholder='python,java...'></textarea>

                            </div>
                            <button type='submit' className='btn btn-primary'>submit</button>
                        </form>
                    </div>

                </div>

            </section>

        </div>
      
    </div>
  )
}

export default AddChapter
