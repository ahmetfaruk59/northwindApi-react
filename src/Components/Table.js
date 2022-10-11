import { useEffect, useState } from 'react'
import axios from 'axios';

function Table() {

    const [filterText, setfilterText] = useState("");
    const [suppliers, setsuppliers] = useState([]);

    useEffect(() => {
        getDataFromApi();
    }, [])


    const getDataFromApi = () => {
        axios.get('https://northwind.vercel.app/api/suppliers')
            .then(res => setsuppliers(res.data));
    }

    const deleteBtnsEvent = (e) => {
        fetch("https://northwind.vercel.app/api/suppliers/" + e, {
            method: 'DELETE'
        })
            .then(res => {
                if (res.status == 200) {
                    getDataFromApi();
                }
            })
    }

   const searchData=()=>{
        const filtered=suppliers.filter((item)=>{
            return Object.keys(item).some((key)=>
            item[key]
            .toString().toLowerCase().includes(filterText.toLocaleLowerCase())
            );
        });
        setsuppliers(filtered)
   }


    return (
        <div>
            <a id="header" href="https://northwind.vercel.app/api/suppliers">northwind.vercel.app/api/categories</a>
            <button className='btn btn-remove' onClick={()=>setsuppliers([])}>Remove All</button>
            <div>
                <button 
                    onClick={()=>getDataFromApi()} >
                    <img style={{width:"12px"}}
                     src="https://cdn-icons-png.flaticon.com/512/1946/1946488.png"/>
                     </button>
                
                <input
                    placeholder='search'
                    value={filterText}
                    onChange={(e) => setfilterText(e.target.value)} />
                <button onClick={()=>searchData()}>Search</button>
            </div>
            <table id="customers">
                <thead>
                    <tr>
                        <th >ID</th>
                        <th>Company Name</th>
                        <th>Contact Name</th>
                        <th >Operation</th>
                    </tr>
                </thead>

                <tbody>

                    {
                        suppliers.map((data, i) => (
                            <tr key={i}>
                                <td >{data.id}</td>
                                <td >{data.companyName}</td>
                                <td >{data.contactName}</td>
                                <td >
                                    <button
                                        className='btn-op btn-delete'
                                        onClick={() => deleteBtnsEvent(data.id)}
                                    >Delete
                                    </button>
                                </td>
                            </tr>

                        ))
                    }

                </tbody>

            </table>

        </div>
    )
}

export default Table