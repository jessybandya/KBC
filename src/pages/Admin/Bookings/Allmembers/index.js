import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { db } from '../../../../firebase';
import Post from './Post';
import axios from 'axios';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { deleteEventApi } from '../../../../redux/actions';
import moment from 'moment';
import { toast } from 'react-toastify';


const columns = [
  { id: 'name', label: 'Name', minWidth: 170 },
  { id: 'code', label: 'ISO\u00a0Code', minWidth: 100 },
  {
    id: 'population',
    label: 'Population',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'size',
    label: 'Size\u00a0(km\u00b2)',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'density',
    label: 'Density',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toFixed(2),
  },
];

function createData(name, code, population, size) {
  const density = population / size;
  return { name, code, population, size, density };
}

const rows = [
  createData('India', 'IN', 1324171354, 3287263),
  createData('China', 'CN', 1403500365, 9596961),
];

export default function StickyHeadTable({ filteredPosts, searchTerm }) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [posts, setPosts] = React.useState([])
    const [pageNumber, setPageNumber] = React.useState(0);
    const [input, setInput] = React.useState("");

     React.useEffect(() => {
         db.collection('users').onSnapshot(snapshot => {
             setPosts(snapshot.docs.map(doc => ({
                 id: doc.id,
                 post: doc.data(),
             })));
         })
     }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const menusPerPage = 100;
  const pagesVisited = pageNumber * menusPerPage;

  const pageCount = Math.ceil(posts.length / menusPerPage);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  const [users, setUsers] = React.useState([]);
  React.useEffect(() => {
      getUsers();
  }, []);
  function getUsers() {
      axios.get('http://localhost/Tutorial/events/').then(function(response) {
          console.log(response.data);
          setUsers(response.data);
      });
  }

  const finalPosts = users.filter(res => {
    return res?.category === 'Television'
  })

  console.log('Names:',users)

  const deleteEvent = (id,title) => {
    if(window.confirm(`Are you sure you want to delete this event:-> ${title}?`)){
      axios.delete(`http://localhost/Tutorial/events/${id}/delete`).then(function() {
      }).catch(function(error) {
          toast.error("Error removing order: ", error);
      }); 
      toast.success(`Event ${title} has been deleted successfully!\nRefresh Page`)   
    }
  }


  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead sx={{ display: "table-header-group" }}>
            <TableRow>
            <TableCell style={{minWidth:100,fontSize:13,backgroundColor: "",fontWeight:"900",borderBottom: "2px solid #43a047",color:"#43a047"}}>FIRST NAME</TableCell>
            <TableCell style={{minWidth:100,fontSize:13,backgroundColor: "",fontWeight:"900",borderBottom: "2px solid #43a047",color:"#43a047"}} align="right">LAST NAME</TableCell>
            <TableCell style={{minWidth:100,fontSize:13,backgroundColor: "",fontWeight:"900",borderBottom: "2px solid #43a047",color:"#43a047"}} align="right">TITLE</TableCell>
            <TableCell style={{minWidth:100,fontSize:13,backgroundColor: "",fontWeight:"900",borderBottom: "2px solid #43a047",color:"#43a047"}} align="right">CATEGORY</TableCell>
            <TableCell style={{minWidth:100,fontSize:13,backgroundColor: "",fontWeight:"900",borderBottom: "2px solid #43a047",color:"#43a047"}} align="right">DESCRIPTION</TableCell>
            <TableCell style={{minWidth:100,fontSize:13,backgroundColor: "",fontWeight:"900",borderBottom: "2px solid #43a047",color:"#43a047"}} align="right">START</TableCell>
            <TableCell style={{minWidth:100,fontSize:13,backgroundColor: "",fontWeight:"900",borderBottom: "2px solid #43a047",color:"#43a047"}} align="right">END</TableCell>
            <TableCell style={{minWidth:100,fontSize:13,backgroundColor: "",fontWeight:"900",borderBottom: "2px solid #43a047",color:"#43a047"}} align="right">STATUS</TableCell>
            <TableCell style={{minWidth:100,fontSize:13,backgroundColor: "",fontWeight:"900",borderBottom: "2px solid #43a047",color:"#43a047"}} align="right">ACTION</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {searchTerm === "" ?(
            finalPosts?.length > 0 ?(
               <>
               {
                   finalPosts.map((user, key) =>
                    <TableRow hover role="checkbox"  key={key}>
                    <TableCell > 
                    {user.firstName}         
                    </TableCell>
                    <TableCell align='right'>  
                    {user.lastName}                
                    </TableCell>
                    <TableCell align='right'>
                    {user.title}                   
                    </TableCell>
                    <TableCell align='right'>
                    {user.category}                   
                    </TableCell>
                    <TableCell align='right'>
                    {user.descriptions}                   
                    </TableCell>
                    <TableCell align='right'>
                    {moment(user.startData).format("ddd DD MMM YY LT")}                  
                    </TableCell>
                    <TableCell align='right'>
                    {moment(user.endDate).format("ddd DD MMM YY LT")}                
                    </TableCell>
                    <TableCell align='right'>
                    {user.statusD}                 
                    </TableCell>
                    <TableCell align='right'>
                     <DeleteForeverIcon style={{color:'#43a047',cursor:'pointer'}} onClick={() => deleteEvent(user.id, user.title)} fontSize='medium'/>                  
                    </TableCell>
              </TableRow>
                    )
    }
               </>
            ):(
               <center><i style={{fontSize:18,fontWeight:'bold'}}>Loading...</i></center>
            )
         ):(
          <>
          {
           filteredPosts.length > 0 ?(
             <>
             {
                             filteredPosts.map((posts2) => (
   
   <Post 
   id={posts2.id}
   firstName={posts2.firstName}
   lastName={posts2.lastName}
   name={posts2.title}
   descriptions={posts2.descriptions}
   startDate={posts2.startDate}
   endDate={posts2.endDate}
   statusD={posts2.statusD}
   category={posts2.category}
   />
   ))
                             }
             </>
           ):(
             <><center style={{fontWeight:'bold'}}><h4>No results...</h4></center></>
           )       
         
         }
          </>
         )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
