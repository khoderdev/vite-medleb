const express = require("express");
const sql = require("mssql");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

// Define the CORS options
const corsOptions = {
  origin: "http://localhost:5173",
};

// Enable CORS with the specified options
app.use(cors(corsOptions));

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// MSSQL configuration
const config = {
  user: "sa",
  password: "Oummal@123",
  server: "192.168.10.88",
  database: "ATC_Test",
  options: {
    encrypt: true,
    trustServerCertificate: true,
  },
};

// Endpoint to get all Drug_ATC records
app.get("/api/atc", async (req, res) => {
  try {
    const pool = await sql.connect(config);
    const result = await pool.request().query("SELECT * FROM Drug_ATC");

    // Check if there are any records returned
    if (result.recordset.length > 0) {
      res.json(result.recordset);
    } else {
      res.status(404).send("No Drug_ATC records found");
    }
  } catch (error) {
    console.error("Error fetching Drug_ATC records:", error);
    res.status(500).send("Error fetching Drug_ATC records");
  }
});

// Endpoint to create a new Drug_ATC record
app.post("/api/atc", async (req, res) => {
  try {
    const {
      Code,
      LevelName,
      LevelNameAr,
      ATCRelatedLabel,
      Enabled,
      CreatedBy,
    } = req.body;
    const pool = await sql.connect(config);
    const result = await pool
      .request()
      .input("Code", sql.NVarChar(3), Code)
      .input("LevelName", sql.NVarChar(255), LevelName)
      .input("LevelNameAr", sql.NVarChar(255), LevelNameAr)
      .input("ATCRelatedLabel", sql.NVarChar(255), ATCRelatedLabel)
      .input("Enabled", sql.Bit, Enabled)
      .input("CreatedBy", sql.NVarChar(255), CreatedBy)
      .query(`INSERT INTO Drug_ATC (Code, LevelName, LevelNameAr, ATCRelatedLabel, Enabled, CreatedBy) 
                    VALUES (@Code, @LevelName, @LevelNameAr, @ATCRelatedLabel, @Enabled, @CreatedBy)`);
    res.status(201).send("Drug_ATC record created successfully");
  } catch (error) {
    console.error("Error creating Drug_ATC record:", error);
    res.status(500).send("Error creating Drug_ATC record");
  }
});

// Endpoint to update an existing Drug_ATC record
app.put("/api/atc/:guid", async (req, res) => {
  try {
    const {
      Code,
      LevelName,
      LevelNameAr,
      ATCRelatedLabel,
      Enabled,
      UpdatedBy,
    } = req.body;
    const { guid } = req.params;
    const pool = await sql.connect(config);
    const result = await pool
      .request()
      .input("Code", sql.NVarChar(3), Code)
      .input("LevelName", sql.NVarChar(255), LevelName)
      .input("LevelNameAr", sql.NVarChar(255), LevelNameAr)
      .input("ATCRelatedLabel", sql.NVarChar(255), ATCRelatedLabel)
      .input("Enabled", sql.Bit, Enabled)
      .input("UpdatedBy", sql.NVarChar(255), UpdatedBy).query(`UPDATE Drug_ATC 
                    SET Code = @Code, 
                        LevelName = @LevelName, 
                        LevelNameAr = @LevelNameAr, 
                        ATCRelatedLabel = @ATCRelatedLabel, 
                        Enabled = @Enabled, 
                        UpdatedDate = getutcdate(), 
                        UpdatedBy = @UpdatedBy
                    WHERE Guid = @Guid`);
    res.status(200).send("Drug_ATC record updated successfully");
  } catch (error) {
    console.error("Error updating Drug_ATC record:", error);
    res.status(500).send("Error updating Drug_ATC record");
  }
});

// Endpoint to delete an existing Drug_ATC record
app.delete("/api/atc/:guid", async (req, res) => {
  try {
    const { guid } = req.params;
    const pool = await sql.connect(config);
    const result = await pool
      .request()
      .input("Guid", sql.UniqueIdentifier, guid)
      .query("DELETE FROM Drug_ATC WHERE Guid = @Guid");
    res.status(200).send("Drug_ATC record deleted successfully");
  } catch (error) {
    console.error("Error deleting Drug_ATC record:", error);
    res.status(500).send("Error deleting Drug_ATC record");
  }
});

//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////

// Endpoint to get all Drug_ATCCodes records
app.get("/api/atccodes", async (req, res) => {
  try {
    const pool = await sql.connect(config);
    const result = await pool.request().query("SELECT * FROM Drug_ATCCodes");
    res.json(result.recordset);
  } catch (error) {
    console.error("Error fetching Drug_ATCCodes records:", error);
    res.status(500).send("Error fetching Drug_ATCCodes records");
  }
});

// Endpoint to create a new Drug_ATCCodes record
app.post("/api/atccodes", async (req, res) => {
  try {
    const {
      ATCGuid,
      Code,
      LevelName,
      LevelNameAr,
      LevelNumber,
      SubstanceName,
      ATCIngredientName,
      ATCIngredientNameAr,
      InteractionIngredientName,
      Enabled,
      CreatedBy,
    } = req.body;
    const pool = await sql.connect(config);
    const result = await pool
      .request()
      .input("ATCGuid", sql.UniqueIdentifier, ATCGuid)
      .input("Code", sql.NVarChar(255), Code)
      .input("LevelName", sql.NVarChar(255), LevelName)
      .input("LevelNameAr", sql.NVarChar(255), LevelNameAr)
      .input("LevelNumber", sql.Int, LevelNumber)
      .input("SubstanceName", sql.NVarChar(255), SubstanceName)
      .input("ATCIngredientName", sql.NVarChar(500), ATCIngredientName)
      .input("ATCIngredientNameAr", sql.NVarChar(500), ATCIngredientNameAr)
      .input("CreatedBy", sql.NVarChar(255), CreatedBy)
      .input(
        "InteractionIngredientName",
        sql.NVarChar(4000),
        InteractionIngredientName
      )
      .input("Enabled", sql.Bit, Enabled)
      .query(`INSERT INTO Drug_ATCCodes (ATCGuid, Code, LevelName, LevelNameAr, LevelNumber, SubstanceName, ATCIngredientName, ATCIngredientNameAr, InteractionIngredientName, Enabled, CreatedBy) 
                    VALUES (@ATCGuid, @Code, @LevelName, @LevelNameAr, @LevelNumber, @SubstanceName, @ATCIngredientName, @ATCIngredientNameAr, @InteractionIngredientName, @Enabled, @CreatedBy)`);
    res.status(201).send("Drug_ATCCodes record created successfully");
  } catch (error) {
    console.error("Error creating Drug_ATCCodes record:", error);
    res.status(500).send("Error creating Drug_ATCCodes record");
  }
});

// Endpoint to update an existing Drug_ATCCodes record
app.put("/api/atccodes/:guid", async (req, res) => {
  try {
    const {
      ATCGuid,
      Code,
      LevelName,
      LevelNameAr,
      LevelNumber,
      SubstanceName,
      ATCIngredientName,
      ATCIngredientNameAr,
      InteractionIngredientName,
      Enabled,
      UpdatedBy,
    } = req.body;
    const { guid } = req.params;
    const pool = await sql.connect(config);
    const result = await pool
      .request()
      .input("ATCGuid", sql.UniqueIdentifier, ATCGuid)
      .input("Code", sql.NVarChar(255), Code)
      .input("LevelName", sql.NVarChar(255), LevelName)
      .input("LevelNameAr", sql.NVarChar(255), LevelNameAr)
      .input("LevelNumber", sql.Int, LevelNumber)
      .input("SubstanceName", sql.NVarChar(255), SubstanceName)
      .input("ATCIngredientName", sql.NVarChar(500), ATCIngredientName)
      .input("ATCIngredientNameAr", sql.NVarChar(500), ATCIngredientNameAr)
      .input(
        "InteractionIngredientName",
        sql.NVarChar(4000),
        InteractionIngredientName
      )
      .input("Enabled", sql.Bit, Enabled)
      .input("UpdatedBy", sql.NVarChar(255), UpdatedBy)
      .input("Guid", sql.UniqueIdentifier, guid).query(`UPDATE Drug_ATCCodes 
                    SET ATCGuid = @ATCGuid, 
                        Code = @Code, 
                        LevelName = @LevelName, 
                        LevelNameAr = @LevelNameAr, 
                        LevelNumber = @LevelNumber, 
                        SubstanceName = @SubstanceName, 
                        ATCIngredientName = @ATCIngredientName, 
                        ATCIngredientNameAr = @ATCIngredientNameAr, 
                        InteractionIngredientName = @InteractionIngredientName, 
                        Enabled = @Enabled,
                        UpdatedDate = getutcdate(), 
                        UpdatedBy = @UpdatedBy
                    WHERE Guid = @Guid`);
    res.status(200).send("Drug_ATCCodes record updated successfully");
  } catch (error) {
    console.error("Error updating Drug_ATCCodes record:", error);
    res.status(500).send("Error updating Drug_ATCCodes record");
  }
});

// Endpoint to delete an existing Drug_ATCCodes record
app.delete("/api/atccodes/:guid", async (req, res) => {
  try {
    const { guid } = req.params;
    const pool = await sql.connect(config);
    const result = await pool
      .request()
      .input("Guid", sql.UniqueIdentifier, guid)
      .query("DELETE FROM Drug_ATCCodes WHERE Guid = @Guid");
    res.status(200).send("Drug_ATCCodes record deleted successfully");
  } catch (error) {
    console.error("Error deleting Drug_ATCCodes record:", error);
    res.status(500).send("Error deleting Drug_ATCCodes record");
  }
});

// Database connection
sql
  .connect(config)
  .then(() => {
    console.log("Connected to MSSQL database");
    // Start server
    const port = process.env.PORT || 3500;
    app.listen(port, () => console.log(`Server running on port ${port}`));
  })
  .catch((error) =>
    console.error("Error connecting to MSSQL database:", error)
  );
