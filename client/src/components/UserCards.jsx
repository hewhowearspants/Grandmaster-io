import React, { Component } from 'react';
import axios from 'axios';

class UserCards extends Component {  
  constructor(){
    super();
    this.state={
      userCardData:null,
    }
  }

  componentDidMount(){
    axios.get('/usercard')
    .then(res=>{
      console.log(res.data)
      this.setState({
        userCardData:res.data,
      })
    })
    .catch(err=>{
      console.log(err);
    })
  }

  render() {
    return (
      <div className='UserCards'>
        {this.state.userCardData ? 
          this.state.userCardData.map(data=>{
            return <div key={data.id} className='single-card'>
                              <div className='card-name'><b>{data.name}</b></div>
                              <div className='card-class'><p>class: {data.class}</p></div>
                              {/* <div className='card-img'><img src={data.image_url} alt='' /></div> */}
                            </div>
          }) : ''
        }
      </div>
    )
  }
}

export default UserCards;