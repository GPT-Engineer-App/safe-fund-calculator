import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Trash2 } from "lucide-react";

const Index = () => {
  const [investors, setInvestors] = useState([]);
  const [summary, setSummary] = useState({
    total: 0,
    preMoney: 0,
    postMoney: 0,
  });

  const addInvestor = () => {
    setInvestors([
      ...investors,
      { id: Date.now(), name: "", amount: "", type: "preMoney" },
    ]);
  };

  const updateInvestor = (id, field, value) => {
    setInvestors(
      investors.map((investor) =>
        investor.id === id ? { ...investor, [field]: value } : investor
      )
    );
  };

  const removeInvestor = (id) => {
    setInvestors(investors.filter((investor) => investor.id !== id));
  };

  const calculateSummary = () => {
    const total = investors.reduce(
      (sum, investor) => sum + Number(investor.amount || 0),
      0
    );
    const preMoney = investors
      .filter((investor) => investor.type === "preMoney")
      .reduce((sum, investor) => sum + Number(investor.amount || 0), 0);
    const postMoney = total - preMoney;

    setSummary({ total, preMoney, postMoney });
  };

  return (
    <div className="container mx-auto p-4">
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold">SAFE Fundraising Calculator</h1>
        <p className="text-muted-foreground">
          Calculate your fundraising with multiple investors
        </p>
      </header>

      <main className="space-y-8">
        <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">Investors</h2>
            <Button onClick={addInvestor}>Add Investor</Button>
          </div>
          <div className="space-y-4">
            {investors.map((investor) => (
              <Card key={investor.id}>
                <CardContent className="pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor={`name-${investor.id}`}>Name</Label>
                      <Input
                        id={`name-${investor.id}`}
                        value={investor.name}
                        onChange={(e) =>
                          updateInvestor(investor.id, "name", e.target.value)
                        }
                        placeholder="Investor name"
                      />
                    </div>
                    <div>
                      <Label htmlFor={`amount-${investor.id}`}>Amount</Label>
                      <Input
                        id={`amount-${investor.id}`}
                        type="number"
                        value={investor.amount}
                        onChange={(e) =>
                          updateInvestor(investor.id, "amount", e.target.value)
                        }
                        placeholder="Investment amount"
                      />
                    </div>
                    <div>
                      <Label>Investment Type</Label>
                      <RadioGroup
                        value={investor.type}
                        onValueChange={(value) =>
                          updateInvestor(investor.id, "type", value)
                        }
                        className="flex space-x-4"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="preMoney" id={`pre-${investor.id}`} />
                          <Label htmlFor={`pre-${investor.id}`}>Pre-money</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="postMoney" id={`post-${investor.id}`} />
                          <Label htmlFor={`post-${investor.id}`}>Post-money</Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </div>
                  <Button
                    variant="destructive"
                    size="icon"
                    className="mt-4"
                    onClick={() => removeInvestor(investor.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section>
          <Card>
            <CardHeader>
              <CardTitle>Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p>Total Investment: ${summary.total.toLocaleString()}</p>
                <p>Pre-money Investment: ${summary.preMoney.toLocaleString()}</p>
                <p>Post-money Investment: ${summary.postMoney.toLocaleString()}</p>
              </div>
              <Button onClick={calculateSummary} className="mt-4">
                Calculate
              </Button>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  );
};

export default Index;