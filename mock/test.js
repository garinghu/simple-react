module.exports = {
    'GET /api/a/b': function(req, res) {
        res.json({
            data: {
                test: 'hello'
            },
            errno: 0,
            errmasg: 'msg'
        })
    }
}