const express=require('express');
const mysql=require('mysql');
const cors=require('cors');
const multer=require('multer')
const path=require('path')
const fs=require('fs')


const PORT=3006;
const app=express();
app.use(cors());
app.use(express.json());
app.use('/uploads',express.static('uploads'));

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => {
         const ext = path.extname(file.originalname);
    const basename = path.basename(file.originalname, ext);
    const uniqueName = basename+"-"+Date.now()+ext;
    cb(null, uniqueName);
    }
});

const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (extname && mimetype) {
        cb(null, true);
    } else {
        cb(new Error("Only .jpg or .jpeg images are allowed"));
    }
};

const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter: fileFilter
});

const mysqlconnection={ host : "localhost", user : "root" , password : "" , database : "radicalproject"};

//for inserting

app.post("/emp/insert",upload.single("image"),(req,res)=>{

    const employee=req.body;

    const image = req.file ? "/uploads/"+req.file.filename : null;

    
    const conn=mysql.createConnection(mysqlconnection);

    conn.connect((err)=>{
        if(err){
            console.log(err)
        }
        else{

            console.log("connected");

            const query="insert into emp_details(name,emp_id,department,designation,project,type,status,image) values(?,?,?,?,?,?,?,?)";

            let values=[employee.name,employee.emp_id,employee.department,employee.designation,employee.project,employee.type,employee.status,image];

            conn.query(query,values,(err,result)=>{

                if(err){
                    console.log(err)
                }
                else{
                    res.json({success:true});
                    console.log("insert sucess")
                }

            })

        }

        conn.end();

        
    })

})


//for displaying

app.get("/emp/det",(req,res)=>{
 
    console.log(req.body);

    const conn = mysql.createConnection(mysqlconnection);

    conn.connect((err)=>{
        if(err){
        console.log(err);
        }
        else{
            console.log("connected");

             
            let query="select * from emp_details";

            conn.query(query,(err,result)=>{
                if(err){
                    console.log(err)
                }
                else{
                    
                    res.json(result);
                }
            })

        }
       
        conn.end();
        
    })

})


//for viewing single employee

app.get("/emp/view/:id",(req,res)=>{

    let empid=req.params.id;

    console.log(req.params.id);

    const conn=mysql.createConnection(mysqlconnection);

    conn.connect((err)=>{
        if(err){
            console.log(err);
        }
        else{

            const query="select * from emp_details where emp_id="+empid;

            conn.query(query,(err,result)=>{
                if(err){
                    console.log(err)
                }
                else{

                    res.json(result);
                }
            })
        }
        conn.end();
    })
})


//for deleting

app.delete("/emp/:id",(req,res)=>{

    let delid = req.params.id;

    console.log(req.params.id);


    const conn=mysql.createConnection(mysqlconnection);

    conn.connect((err)=>{

        if(err){
        console.log(err);
        }
        else{
            console.log("connected");

            let query="delete from emp_details where emp_id="+delid;

            conn.query(query,(err,result)=>{
                if(err){
                    console.log(err)
                }
                else{
                    res.json({success:true});
                    
                    
                }
            })
        }

        conn.end();

    })
})


//for updating

app.put("/emp/update/:id",upload.single("image"),(req,res)=>{

    const id=req.params.id;

    const employee=req.body;

    const newImage = req.file ? "/uploads/"+req.file.filename : null;


    
    const conn=mysql.createConnection(mysqlconnection);

    conn.connect((err)=>{
        if(err){
            console.log(err)
        }
        else{
            

            console.log("connected");

            conn.query("SELECT image FROM emp_details WHERE emp_id=?", [id], (err, result) => {
            if(err){
               return res.status(500).json({ success: false, message: "Failed to fetch old image" });
            } 
        
            const oldImage = result.length > 0 ? result[0].image : null;

            const finalImage = newImage || (result.length > 0 ? result[0].image : null);

            


            const query="update emp_details set name=?,department=?,designation=?,project=?,type=?,status=?,image=? where emp_id="+id;

            let values=[employee.name,employee.department,employee.designation,employee.project,employee.type,employee.status,finalImage];

            conn.query(query,values,(err,result)=>{

                if(err){
                    console.log(err)
                }
                else{
                    res.json({success:true});
                    console.log("update sucess")
                }

                if (newImage && oldImage) {
                    const oldImagePath = path.join(__dirname, oldImage);
                    fs.unlink(oldImagePath, (unlinkErr) => {
                        if (unlinkErr) {
                            console.log("Warning: could not delete old image:", unlinkErr);
                        } else {
                            console.log("Old image deleted:", oldImagePath);
                        }
                    });
                }

            })

             conn.end();

            });


        }

        
    })

})

app.use((err, req, res, next) => {
    if (err instanceof multer.MulterError && err.code === "LIMIT_FILE_SIZE") {
        return res.status(400).json({ success: false, message: "File too large. Max size is 5MB." });
    }
    if (err.message === "Only .jpg or .jpeg images are allowed") {
        return res.status(400).json({ success: false, message: err.message });
    }

    console.error("Unexpected error:", err);
    res.status(500).json({ success: false, message: "Internal server error" });
});

app.listen(PORT,()=>console.log("port running in 3006"));