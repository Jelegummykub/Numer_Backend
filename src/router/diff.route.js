const express = require('express')
const router = express.Router()
const { body } = require('express-validator')
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()


router.post('/equationdiff/diff',
    body('equationdiff').notEmpty().withMessage("กรุณากรอกโจทย์"),

    async (req, res) => {
        const { equationdiff } = req.body

        try {
            const creatediff = await prisma.diff.create({
                data: { equationdiff: String(equationdiff) }
            })
            return res.status(200).json({
                result: true,
                status: "success",
                msg: "เพิ่มโจทย์สำเร็จ",
                data: creatediff
            })
        } catch (error) {
            console.error("เพิ่มไม่สำเร็จ", error)
            return res.status(500).json({
                result: false,
                status: "error",
                msg: "เพิ่มโจทย์ไม่สำเร็จ",
            })
        }
    }
)

router.get('/diffeq', async (req, res) => {
    try {
        const readeq = await prisma.diff.findMany()
        return res.status(200).json({
            result: true,
            status: "success",
            data: readeq
        })
    } catch (error) {
        console.error("ไม่สามารถอ่านได้", error)
        return res.status(500).json({
            result: false,
            status: "error",
            msg: "เกิดข้อผิดพลาดในการอ่านข้อมูล"
        })
    }
})


module.exports = router
