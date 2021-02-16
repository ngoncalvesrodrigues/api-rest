import { Router } from "express";
import { getClients, getPolicies } from "../api";

const router = Router();

router.get("/", (req, res) => {
  const CUSTOMERS_LIMIT = 10;
  Promise.all([getClients(), getPolicies()])
    .then(([{ data: clientsData }, { data: policiesData }]) => {
      const clients = clientsData.map(({ id, name, email, role }) => ({
        id,
        name,
        email,
        role,
        policies: policiesData
          .filter(({ clientId }) => clientId === id)
          .map(({ id, amountInsured, inceptionDate }) => ({
            id,
            amountInsured,
            inceptionDate,
          })),
      }));
      console.log(clients);
      const limit = req.query.limit || CUSTOMERS_LIMIT;
      res.json(clients.slice(0, limit));
    })
    .catch((error) => {
      res.status(403).json({ code: 403, message: error.message });
    });
});

router.get("/:id", (req, res) => {
  Promise.all([getClients(), getPolicies()])
    .then(([{ data: clientsData }, { data: policiesData }]) => {
      const clients = clientsData
        .filter(({ id }) => id === req.params.id)
        .map(({ id, name, email, role }) => ({
          id,
          name,
          email,
          role,
          policies: policiesData
            .filter(({ clientId }) => clientId === id)
            .map(({ id, amountInsured, inceptionDate }) => ({
              id,
              amountInsured,
              inceptionDate,
            })),
        }));
      if (clients.length) {
        res.json(clients);
      } else {
        res.status(404).json({ code: 404, message: "Not found error" });
      }
    })
    .catch(() => {
      res.status(403).json({ code: 403, message: "Forbiden Error" });
    });
});

router.get("/:id/policies", (req, res) => {
  getPolicies()
    .then(({ data }) => {
      const policies = data
        .filter(({ clientId }) => clientId === req.params.id)
        .map(
          ({
            id,
            amountInsured,
            email,
            inceptionDate,
            installmentPayment,
          }) => ({
            id,
            amountInsured,
            email,
            inceptionDate,
            installmentPayment,
          })
        );
      if (policies.length) {
        res.json(policies);
      } else {
        res.status(404).json({ code: 404, message: "Not found error" });
      }
    })
    .catch(() => {
      res.status(403).json({ code: 403, message: "Forbiden Error" });
    });
});

export default router;
