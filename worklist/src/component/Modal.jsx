import React from 'react'
import Reset from './Reset'

export default function Modal() {
  return (
      <div style={{margin:"auto", width:"100%"}}>
          <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div className="modal-dialog" style={{ margin: "auto" }}>
                  <div className="modal-content" style={{ backgroundColor: "aliceblue" }}>
                      {/* <div className="modal-header">
                          <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div> */}
                      <div className="modal-body" >
                          <Reset/>
                      </div>
                  </div>
              </div>
          </div>
    </div>
  )
}
