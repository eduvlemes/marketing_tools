exports.get = ({ appSdk }, req, res) => {
    res.set({
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Accept-Encoding, Cache-Control",
        "Access-Control-Max-Age": "600"
    })
    
    res.json({msg:"hi"})
}