import { Router } from 'express';
import { getPolicies } from '../api';

const router = Router();

router.get('/', (req, res) => {
  getPolicies()
    .then(({ data }) => {
      const policies = data.map(
        ({ id, amountInsured, email, inceptionDate, installmentPayment }) => ({
          id,
          amountInsured,
          email,
          inceptionDate,
          installmentPayment,
        })
      );
      res.json(policies);
    })
    .catch(() => {
      res.status(403).json({ code: 403, message: 'Forbiden Error' });
    });
});

router.get('/:id', (req, res) => {
  getPolicies()
    .then(({ data }) => {
      const policyData = data.find(({ id }) => id === req.params.id);
      console.log(policyData);
      if (policyData) {
        const policy = {
          id: policyData.id,
          amountInsured: policyData.amountInsured,
          email: policyData.email,
          inceptionDate: policyData.inceptionDate,
          installmentPayment: policyData.installmentPayment,
        };
        res.json([policy]);
      } else {
        res.status(404).json({ code: 404, message: 'Not found error' });
      }
    })
    .catch(() => {
      res.status(403).json({ code: 403, message: 'Forbiden Error' });
    });
});

export default router;
