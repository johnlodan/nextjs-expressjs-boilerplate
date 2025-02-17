export default function authorizeRoles(...allowedRoles: any) {
    return (req: any, res: any, next: any) => {
        if (!allowedRoles?.includes(req?.user?.role)) {
            return res.status(401).send({ message: 'Access Denied' })
        }
    }
}
