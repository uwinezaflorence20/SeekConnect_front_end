


import Lostitem from '../Admin/Lostitem'
import Griditem from './Griditem';
import Gridperson from './Gridperson';

import Lostpeople from '../Admin/LostPeople';

const Dashboard = () => {
  return (
    <div>
      <Gridperson/>
       <Griditem/>
        <Lostpeople/>
       <Lostitem/> 
       
       
     
     
    </div>
  )
}

export default Dashboard
