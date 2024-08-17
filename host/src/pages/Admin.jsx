import React from "react";
import NotFound from "./NotFound";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

const Page = () => {
  //traerme el user que está logeado

  const ADMIN_EMAIL = process.env.ADMIN_EMAIL;

  if (!user || user.email !== ADMIN_EMAIL) {
    return <Navigate to="/404" />;
  }

  //------------------PARA QUE SALGA LOS VALORES DE LA SEMANA, MES-------------
  // const orders = await db.order.findMany({
  //   where: {isPaid: true,
  //   createdAt: {
  //     gte: new Date().setDate(newDate.getDate()-7) //última semana
  //   }
  // },
  // orderBy: {
  //   createdAt:"desc",

  // },
  // include: {
  //   user: true,
  //   shippingAdress: true,
  // }
  // })

  // const lastWeekSum = await db.order.aggregate({
  //   where: {
  //     isPaid: true,
  //     createdAt: {
  //       gte: new Date(new Date().setDate(new Date().getDate() - 7)),
  //     },
  //   },
  //   _sum: {
  //     amount: true,
  //   },
  // })

  // const lastMonthSum = await db.order.aggregate({
  //   where: {
  //     isPaid: true,
  //     createdAt: {
  //       gte: new Date(new Date().setDate(new Date().getDate() - 30)),
  //     },
  //   },
  //   _sum: {
  //     amount: true,
  //   },
  // })

  const WEEKLY_GOAL = 500;
  const MONTHLY_GOAL = 2500;

  //https://github.com/joschan21/casecobra/blob/master/src/components/ui/progress.tsx
  return (
    <div className="flex min-h-screen w-full bg-muted/40">
      <div className="max-w-7xl w-full mx-auto flex flex-col sm:gap-4 sm:py-4">
        <div className="flex flex-col gap-16">
          <div className="grid gap-4 sm:grid-cols-2">
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Last Week</CardDescription>
                <CardTitle className="text-4xl">
                  {formatPrice(lastWeekSum._sum.amount ?? 0)}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-muted-foreground">
                  of {formatPrice(WEEKLY_GOAL)} goal
                </div>
              </CardContent>
              <CardFooter>
                <Progress
                  value={((lastWeekSum._sum.amount ?? 0) * 100) / WEEKLY_GOAL}
                />
              </CardFooter>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Last Month</CardDescription>
                <CardTitle className="text-4xl">
                  {formatPrice(lastMonthSum._sum.amount ?? 0)}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-muted-foreground">
                  of {formatPrice(MONTHLY_GOAL)} goal
                </div>
              </CardContent>
              <CardFooter>
                <Progress
                  value={((lastMonthSum._sum.amount ?? 0) * 100) / MONTHLY_GOAL}
                />
              </CardFooter>
            </Card>
          </div>

          <h1 className="text-4xl font-bold tracking-tight">Incoming orders</h1>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead className="hidden sm:table-cell">Status</TableHead>
                <TableHead className="hidden sm:table-cell">
                  Purchase date
                </TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id} className="bg-accent">
                  <TableCell>
                    <div className="font-medium">
                      {order.shippingAddress?.name}
                    </div>
                    <div className="hidden text-sm text-muted-foreground md:inline">
                      {order.user.email}
                    </div>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    <StatusDropdown id={order.id} orderStatus={order.status} />
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {order.createdAt.toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-right">
                    {formatPrice(order.amount)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};
